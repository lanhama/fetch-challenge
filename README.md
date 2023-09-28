### Running the basic express.js server on docker

1. clone this repository
2. navigate to the root of the directory
3. build the docker image
    `docker build image . -t <image name>:<image tag>`
    I am using node:lts-alpine as it is ultra lightweight

4. run the docker application and forward local port requests to docker ports
    `docker run -p 3000:3000 <image ID>`

5. Make a post request locally (I'm using curl, but you can use Postman or any other HTTP request tool)
e.g.

```
curl -X POST -H "Content-Type: application/json" -d '{                             
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    },{
      "shortDescription": "Emils Cheese Pizza",
      "price": "12.25"
    },{
      "shortDescription": "Knorr Creamy Chicken",
      "price": "1.26"
    },{
      "shortDescription": "Doritos Nacho Cheese",
      "price": "3.35"
    },{
      "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
      "price": "12.00"
    }
  ],
  "total": "35.35"
}' http://localhost:3000/receipts/process
```

you should receive something like:
`{"id":"57d2b80b55a3fd2cd047988ffd8d5a7be9040ed7"}`

6. Make a get request using the provided code
e.g.
```
curl http://localhost:3000/receipts/d355858147a3b1b73328de5167f793d460c22230/points
```

you should receive a response that looks like:
`{"points":"28"}`
