# API Code Generator

This project is built to automate the process of creating API client and functions to call to our endpoints. The idea is to provide a list of endpoints and metadata, run a script and generate files that contains all the functions needed to fetch data through the API.

## Getting Started

1. Provide your API details in `api.yaml` file

### Format
```yaml
name: API name
base_url: Base Endpoint

# A list of endpoints
endpoints:
    - resource:
        GET /resource:
            # metadata (summary, data type)

        # {id} is a placeholder for your parameter
        GET /resource/{id}:
            # metadata (summary, data type)
        
        POST /resource:
            # metadata (summary, data type)
```

2. Run the script

```sh
npm install
npm run build
```

3. Check your `/api` folder for the code.

