# First name researcher

Some nodejs scripts to help me and my wife finding the less regular first names for our second child.

### Install

- run command :

``` javascript
npm install
```

## Data from lexique.org

- run command :

``` javascript
node process-data-lexique.org.js
```

will output 2 json files in data-lexique-org: female.json and male.json. We just selected first names which are french and (spanish or english).

## Data from dataaddict.fr/prenoms

``` javascript
node extract-first-names-from-dataaddict.js
```

will output 2 json files in data-from-dataaddict.fr: female.json and male.json.

## Process data with prenoms.com

Extract average age

``` javascript
node extract-data-first-name-from-prenoms.com.js
```

Female :
- 709 first names
- between 36 and 80 years

Male : 
- 581 first names
- between X and X years