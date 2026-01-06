// Add this to the very top of the first file loaded in your app

var apm = require('elastic-apm-node').start({

  // The service name is the primary filter in the APM UI and is used to group errors and trace data together. Allowed characters are a-z, A-Z, 0-9, -, _, and space. Overrides the service name in package.json.

  serviceName: 'node-basic-apm-app',


  // Use if APM Server requires a secret token. Both the agent and APM Server must be configured with the same token. This ensures that only your agents can send data to your APM server.

  apiKey: '<your api key here>',


  // Set the custom APM Server URL (default: http://localhost:8200). The URL must be fully qualified, including protocol (http or https) and port.

  serverUrl: '<your elastic deployed link here with port>',


  // The name of the environment this service is deployed in, e.g., "production" or "staging". Environments allow you to easily filter data on a global level in the APM UI. It's important to be consistent when naming environments across agents.

  environment: 'development',
  transactionSampleRate: 1.0, 
  captureSpanStackTraces: true,

  logLevel: 'info'

})
