# Timestamp Notes Plugin for Obsidian

A simple Obsidian plugin that allows you to quickly append timestamped notes to your daily notes.

## Features

- **Quick capture**: Add timestamped entries to your daily note with a single command
- **Customizable timestamp format**: Use any moment.js format for timestamps
- **Flexible templates**: Define how your entries should be formatted
- **Two ways to add notes**:
  - Open a modal to type your note
  - Select text in any document and append it as a timestamped note
- **Append location**: Choose to add entries at the beginning or end of your daily note

## Requirements

- Obsidian Daily Notes plugin must be enabled
- The plugin will use your Daily Notes settings for note location and format

## Installation

1. Copy the `main.js`, `manifest.json`, and `styles.css` files to your vault's `.obsidian/plugins/timestamp-notes/` folder
2. Reload Obsidian
3. Enable the plugin in Settings → Community plugins

## Usage

### Commands

The plugin adds two commands to Obsidian:

1. **Append timestamped note to daily note**: Opens a modal where you can type your note
2. **Append selection as timestamped note to daily note**: Takes the currently selected text and adds it to your daily note

You can access these commands through:
- Command palette (Ctrl/Cmd + P)
- Assign hotkeys in Settings → Hotkeys

### Settings

Configure the plugin in Settings → Timestamp Notes:

- **Timestamp format**: Define how timestamps should appear (default: `HH:mm`)
  - Examples: 
    - `HH:mm` → 14:30
    - `h:mm A` → 2:30 PM
    - `YYYY-MM-DD HH:mm` → 2024-03-15 14:30
- **Entry template**: Define the format of each entry (default: `- {timestamp} - {content}`)
  - Use `{timestamp}` for the timestamp
  - Use `{content}` for your note content
- **Append to end**: Toggle whether new entries are added at the end (on) or beginning (off) of the daily note

## Example

With default settings, if you add a note "Meeting with team about new project" at 2:30 PM, it will appear in your daily note as:

```
- 14:30 - Meeting with team about new project
```

## Development

To build the plugin from source:

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to compile the plugin
4. Copy the built files to your vault's plugins folder

## License

MIT