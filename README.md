# Running the basic receipt express.js API via Docker

## Set up your docker image
First, ensure that your docker daemon is running

Next, clone this repository

After you've cloned the repository, navigate to the root of the directory
build the docker image using the provided Dockerfile:

`docker image build . -t <image name>:<image tag>`

## Run your server

run the docker application and forward local port requests to docker ports
    `docker run -p 3000:3000 <image ID>`

## Make requests against your endpoint

### Make a post request against your API 
(I'm using curl, but you can use Postman or your preferred HTTP request tool)

```
curl -X POST -H "Content-Type: application/json" -d \
'{                             
    "retailer": "Target",
    "purchaseDate": "2022-01-01",
    "purchaseTime": "13:01",
    "items": [
        {
        "shortDescription": "Mountain Dew 12PK",
        "price": "6.49"
        },
        {
            "shortDescription": "Emils Cheese Pizza",
            "price": "12.25"
        },
        {
            "shortDescription": "Knorr Creamy Chicken",
            "price": "1.26"
        },
        {
            "shortDescription": "Doritos Nacho Cheese",
            "price": "3.35"
        },
        {
            "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
            "price": "12.00"
        }
    ],
    "total": "35.35"
}' \
http://localhost:3000/receipts/process
```

response:
`{"id":"57d2b80b55a3fd2cd047988ffd8d5a7be9040ed7"}`

### Make a get request against your API

`
curl http://localhost:3000/receipts/57d2b80b55a3fd2cd047988ffd8d5a7be9040ed7/points
`

response:
`{"points":"28"}`
