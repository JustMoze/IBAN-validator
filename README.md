# IBAN-validator

## Instructions
IBAN-validator project is deployed on https://iban-validator-modestas.herokuapp.com, but if you want to run this project locally, you can do this by following these steps below: 👇 

#### 1. Install all project dependencies
`
  npm install
`
#### 2. Start node server
`
  node .\index.js
`
<br />
<br />
If you don't have Node.js on your environment, follow this installation steps -> https://nodejs.org/en/

#### 3. Done

## Examples

*IBAN validation rules:*

1. Country code must match one of ISO 3166-1 alpha-2 codes
1. IBAN number cannot be longer than 34 symbols
1. IBAN number must conform to the correct format

### IBAN number validation

__Get request__
`
 https://iban-validator-modestas.herokuapp.com/:IBAN,
`
 where `/:IBAN` is IBAN number you would like to test.
 <br>
 <br>
 __Possible results:__
 
 *Status code: 200*
  <br>
  
 ```
  {
    IBAN: <Your declared IBAN number>,
    valid: true,
    isSEB: true/false
  }
 ```
 *Status code: 200*
  <br>
   ```
  {
    message: "Country code does not match any of ISO 3166-1 alpha-2 codes" / "IBAN number is to long" / "This IBAN number <Your declared IBAN number> does not match correct format"
  }
 ```
 
 ### IBAN numbers validation from .csv file
 
 __Post request__
 `
  https://iban-validator-modestas.herokuapp.com/iban/file,
`
with this request you also have to add .csv file with IBAN numbers to request's body. Image below 👇

![alt text](https://github.com/JustMoze/IBAN-validator/blob/master/utils/images/Postman.png?raw=true)

#### IMPORTANT!!!
```diff
- Adding file to Postman do not define key name, LEAVE IT EMPTY 
```

 __File structure__
 
 All IBAN numbers has to be written vertically in first column (A col)

__Possible results:__
 *Status code: 200*
 <br>
```
  {
    "IBANS": {
        "valid": [
            {
                "IBAN": "LT227044077788877777",
                "valid": true
            }, 
            ...
        ],
        "bank": [
            {
                "IBAN": "LT227044077788877777",
                "Bank": "SEB"
            },
            ...
        ]
    }
}
 ```
 
  *Status code: 400*
 <br>
 
 ```
 {
    message: "No file found" / "Incorect file format. File must be .csv format"
 }
 ```
 
 
  ### IBAN numbers validation list
  
  __Post request__
 `
  https://iban-validator-modestas.herokuapp.com/iban/list,
`
Request body should contain array of IBAN numbers you would like to test. Example: 

```
[
  "LT224010077788877777",
  "LT227300077788877854",
  "LT227041077788877777",
  ...
]
```

__Possible results:__
 *Status code: 200*
 <br>
```
  {
    "IBANS": {
        "valid": [
            {
                "IBAN": "LT227044077788877777",
                "valid": true
            }, 
            ...
        ],
        "bank": [
            {
                "IBAN": "LT227044077788877777",
                "Bank": "SEB"
            },
            ...
        ]
    }
}
 ```

 
