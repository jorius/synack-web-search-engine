# synack-web-search-engine

### This is a web application to fetch data from Google, Bing or both search engines and display it customly.
<hr />

## Currently deployed
### https://env-testing.azurewebsites.net
<hr />

## Content

1. [Prerequisites](#prerequisites)
2. [Architecture definition](#Architecture-definition)
3. [Google Custom Search JSON API Implementation](#Google-Custom-Search-JSON-API-Implementation)
4. [Google Custom Search JSON API Limitations](#Google-Custom-Search-JSON-API-Limitations)
5. [Bing Search API Implementation](#Bing-Search-API-Implementation)
6. [Bing Search API Limitations](#Bing-Search-API-Limitations)
    - [Prerequisites to aproach this implementation](#Prerequisites-to-aproach-this-implementation)
7. [How to run it locally](#How-to-run-it-locally)
<hr />

## Prerequisites
1. [NodeJS](https://nodejs.org/en/)
2. [Git](https://git-scm.com/)
3. [Visual Studio Code](https://code.visualstudio.com/)
<hr />

## Architecture definition

| Folder name    | Folder definition                                         |
| -------------- | --------------------------------------------------------- |
| .github        | Folder to store github workflows, actions, and pipelines. |
| .vscode        | Visual Studio Code workspace settings.                    |
| src/components | Dumb components.                                          |
| src/containers | Components to inject redux data flow.                     |
| src/pages      | Smart components.                                         |
| src/redux      | Redux store, actions, reducers and initial state.         |
<hr />

## Google Custom Search JSON API Implementation

I used the `Programmable Search Engine` within the `Custom Search JSON API`.

Steps
1. Create a search engine in https://programmablesearchengine.google.com/cse/all.
    - Once created turn on the option called "Search the entire web".
    - Store the `Search engine ID` somewhere by the moment.
    - The `Search engine ID` property wich should look like: `298a0ef142f5bd446`.

2. Then go to the docs https://programmablesearchengine.google.com/cse/all and create and `API KEY` since there.
    - It should look like: `AIzaSyCj-QWPgNWRIMyE4Wr17CDbN1ITW8jGYBw` store it somewhere by the moment as well.

### We're ready to go!

Some helpful links
1. https://developers.google.com/custom-search
2. https://developers.google.com/custom-search/docs/overview
3. https://developers.google.com/custom-search/v1/overview
4. https://programmablesearchengine.google.com/cse/all
5. https://developers.google.com/custom-search/v1/using_rest
<hr />

## Google Custom Search JSON API Limitations
The free layer it is limited to 100 search queries per day, for more info: <br />
https://developers.google.com/custom-search/v1/overview#pricing
<hr />

## Bing Search API Implementation

I used the `Cognitive Services` and `Bing WEB Search API`.

## Prerequisites to aproach this implementation
1. You must have a subscription to Azure services.

Steps
1. Go to https://portal.azure.com/.
2. Go to [Cognitive Services](https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.CognitiveServices).
3. Add a new service based on `Bing Search`.
4. Go to your newly created service.
5. Go to the left pane menu option called `Keys and Endpoint`.
6. Store one of your two keys somewhere by the moment.
7. Your key should look like `2011cb2cdee24ebf8cef34499a81db0e`.

Some helpful links
1. https://docs.microsoft.com/en-us/azure/cognitive-services/bing-web-search/
2. https://docs.microsoft.com/en-us/azure/cognitive-services/bing-web-search/quickstarts/client-libraries?pivots=programming-language-javascript

<hr />

## Bing Search API Limitations
The free layer it is limited to 1000 transactions per month, for more info: <br />
https://azure.microsoft.com/en-us/pricing/details/cognitive-services/search-api/
<hr />

## How to run it locally
1. Clone the repository
2. Install packages
    ```bash
    npm install # in the root rolder where the package.json is
    ```
2. Create a `.env` file in the root of the project, you can copy the values from the `.env.example` file and populate the values following the example below:

Remember those values you store somewhere? Well, it is time for use them.

| env name                               | env value         |
| -------------------------------------- | ----------------- |
| REACT_APP_GOOGLE_SEARCH_ENGINE_ID      | Search engine ID  |
| REACT_APP_GOOGLE_SEARCH_ENGINE_API_KEY | Google API KEY    |
| REACT_APP_BING_SEARCH_ENGINE_API_KEY   | Azure API KEY     |
<hr />
