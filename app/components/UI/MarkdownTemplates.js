const TEMPLATES = {
  schedule: {
    title: 'Weekly Schedule',
    text: `# Weekly Schedule
| Day/Hours | 10 AM | 12 AM | 2 PM | 4 PM  | 6 PM |
|:--- |:--- |:--- |:--- |:--- |:--- |
| **Monday** |  |  |  |  |  |
| **Tuesday** |  |  |  |  |  |
| **Wednesday** |  |  |  |  |  |
| **Thursday** |  |  |  |  |  |
| **Friday** |  |  |  |  |  |
| **Saturday** |  |  |  |  |  |
| **Sunday** |  |  |  |  |  |

`,
  },
  taskList: {
    title: 'Task List',
    text: `# Task List
[ ] UI Adjustments
[ ] Add Metadata to Landing Page
[ ] Add query paremeter
[ ] [SPIKE] Investigate how much effort to build new screens
`,
  },
  snippet: {
    title: 'Code Snippets',
    text: `# Code Snippets
## Ruby

\`\`\`ruby
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html

\`\`\`

## Javascript

\`\`\`
function test() {
console.log("notice the blank line before this function?");
}

\`\`\``,
  },
  readme: {
    title: 'README',
    text: `# README
> MDyna is a markdown notes application that syncs with Github gists, and much more
## 🏠 Homepage

Visit our Landing Page [here](https://mdyna.dev)

## Main Features

* Git Flavoured Markdown (GFM) support
* macOs + Windows + Linux
* Code syntax highlighting for several languages
* Dark Mode
* Tag notes with labels
* Organize cards through boards
* Cloud syncing through custom directory
* Github gist sync
* Export boards as markdown files
* Import .md files from directory


## Author

👤 **David Morais**

* Twitter: [@Psybork](https://twitter.com/Psybork)
* Github: [@mdyna](https://github.com/mdyna)

## 🤝 Contributing

http://mdyna.dev/
Contributions, issues and feature requests are welcome!<br />
Feel free to check our community page [issues page](https://spectrum.chat/mdyna/bugs?tab=posts).<br/>
You can also open an issue via [Github issues](https://github.com/mdyna/mdyna-app/issues)

## Show your support

Give a ⭐️ if this project helped you!`,
  },
};

export default TEMPLATES;
