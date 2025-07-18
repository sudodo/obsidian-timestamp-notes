import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, moment } from 'obsidian';
import { getDailyNote, getAllDailyNotes, createDailyNote, appHasDailyNotesPluginLoaded } from 'obsidian-daily-notes-interface';

interface TimestampNotesSettings {
	timestampFormat: string;
	entryTemplate: string;
	appendToEnd: boolean;
}

const DEFAULT_SETTINGS: TimestampNotesSettings = {
	timestampFormat: 'HH:mm',
	entryTemplate: '- {timestamp} - {content}',
	appendToEnd: true
}

export default class TimestampNotesPlugin extends Plugin {
	settings: TimestampNotesSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: 'append-timestamped-note',
			name: 'Append timestamped note to daily note',
			callback: () => {
				new TimestampNoteModal(this.app, this).open();
			}
		});

		this.addCommand({
			id: 'append-timestamped-note-from-selection',
			name: 'Append selection as timestamped note to daily note',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				if (!selection) {
					new Notice('No text selected');
					return;
				}
				await this.appendTimestampedNote(selection);
				new Notice('Added to daily note');
			}
		});

		this.addSettingTab(new TimestampNotesSettingTab(this.app, this));
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async appendTimestampedNote(content: string) {
		if (!appHasDailyNotesPluginLoaded()) {
			new Notice('Daily Notes plugin is not enabled. Please enable it first.');
			return;
		}

		try {
			const today = moment();
			const allDailyNotes = getAllDailyNotes();
			let dailyNote = getDailyNote(today, allDailyNotes);

			if (!dailyNote) {
				dailyNote = await createDailyNote(today);
				if (!dailyNote) {
					new Notice('Failed to create daily note');
					return;
				}
			}

			const timestamp = moment().format(this.settings.timestampFormat);
			const entry = this.settings.entryTemplate
				.replace('{timestamp}', timestamp)
				.replace('{content}', content);

			const fileContent = await this.app.vault.read(dailyNote);
			const contentToAppend = fileContent.length > 0 && !fileContent.endsWith('\n') 
				? '\n' + entry 
				: entry;

			if (this.settings.appendToEnd) {
				await this.app.vault.append(dailyNote, '\n' + contentToAppend);
			} else {
				const newContent = contentToAppend + '\n' + fileContent;
				await this.app.vault.modify(dailyNote, newContent);
			}

			new Notice('Note added to daily note');
		} catch (error) {
			console.error('Error appending timestamped note:', error);
			new Notice('Failed to append note to daily note');
		}
	}
}

class TimestampNoteModal extends Modal {
	plugin: TimestampNotesPlugin;
	input: HTMLTextAreaElement;

	constructor(app: App, plugin: TimestampNotesPlugin) {
		super(app);
		this.plugin = plugin;
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.addClass('timestamp-notes-modal');
		
		contentEl.createEl('h2', {text: 'Add timestamped note'});
		
		const inputContainer = contentEl.createDiv();
		this.input = inputContainer.createEl('textarea', {
			attr: {
				placeholder: 'Enter your note here...',
				rows: '6',
				cols: '50',
				style: 'width: 100%; margin-bottom: 10px;'
			}
		});

		const buttonContainer = contentEl.createDiv({attr: {style: 'text-align: right;'}});
		
		const cancelButton = buttonContainer.createEl('button', {text: 'Cancel'});
		cancelButton.style.marginRight = '10px';
		cancelButton.addEventListener('click', () => this.close());

		const submitButton = buttonContainer.createEl('button', {text: 'Add to Daily Note'});
		submitButton.addEventListener('click', async () => {
			const content = this.input.value.trim();
			if (content) {
				await this.plugin.appendTimestampedNote(content);
				this.close();
			} else {
				new Notice('Please enter some content');
			}
		});

		this.input.focus();
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class TimestampNotesSettingTab extends PluginSettingTab {
	plugin: TimestampNotesPlugin;

	constructor(app: App, plugin: TimestampNotesPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Timestamp Notes Settings'});

		new Setting(containerEl)
			.setName('Timestamp format')
			.setDesc('Format for timestamps (uses moment.js format). Examples: HH:mm, YYYY-MM-DD HH:mm:ss')
			.addText(text => text
				.setPlaceholder('HH:mm')
				.setValue(this.plugin.settings.timestampFormat)
				.onChange(async (value) => {
					this.plugin.settings.timestampFormat = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Entry template')
			.setDesc('Template for each entry. Use {timestamp} and {content} as placeholders')
			.addText(text => text
				.setPlaceholder('- {timestamp} - {content}')
				.setValue(this.plugin.settings.entryTemplate)
				.onChange(async (value) => {
					this.plugin.settings.entryTemplate = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Append to end')
			.setDesc('If enabled, new entries are added at the end. If disabled, they\'re added at the beginning')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.appendToEnd)
				.onChange(async (value) => {
					this.plugin.settings.appendToEnd = value;
					await this.plugin.saveSettings();
				}));

		containerEl.createEl('h3', {text: 'Timestamp format examples'});
		const examples = containerEl.createEl('div', {attr: {style: 'font-size: 0.9em; color: var(--text-muted);'}});
		const now = moment();
		examples.createEl('p', {text: `HH:mm → ${now.format('HH:mm')}`});
		examples.createEl('p', {text: `YYYY-MM-DD HH:mm → ${now.format('YYYY-MM-DD HH:mm')}`});
		examples.createEl('p', {text: `h:mm A → ${now.format('h:mm A')}`});
		examples.createEl('p', {text: `YYYY-MM-DD HH:mm:ss → ${now.format('YYYY-MM-DD HH:mm:ss')}`});
	}
}