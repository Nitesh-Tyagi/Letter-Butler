# Letter-Butler

## Description

Letter-Butler is a Chrome extension designed to enhance your Gmail experience. It provides the following features:

- **Labels**: Quickly categorize emails with labels such as Urgent, Excited, Payment, Billing, Tech, Legal, News, Inform, Request, and Complain.

- **Summarization**: Generate concise summaries of emails to save time and make your inbox more manageable.

## Installation

To install Letter-Butler, follow these steps:

1. Download and unzip the code from this repository.

2. In your Chrome browser, navigate to `chrome://extensions`.

3. Enable Developer Mode from the top right corner.

4. Click on "Load unpacked" from the top left corner.

5. Select the folder containing the extension's code.

## Models and Approaches

Letter-Butler uses advanced AI models for its labeling and summarization features:

- **Zero-Shot Classification**: For labeling emails with the following model:
  - Model: [Facebook/Bart-Large-MNLI](https://api-inference.huggingface.co/models/facebook/bart-large-mnli)

- **Summarization**: For generating email summaries with the following model:
  - Model: [Facebook/Bart-Large-CNN](https://api-inference.huggingface.co/models/facebook/bart-large-cnn)

