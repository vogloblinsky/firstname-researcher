# First name researcher

Some nodejs scripts to help me and my wife finding the less regular first names for our second child.

### 0. Install

- run command :

``` javascript
npm install
```

## 1. Data from lexique.org

- run command :

``` javascript
node process-data-lexique.org.js
```

will output 2 json files in data-lexique-org folder: female.json and male.json. We just selected first names which are french and (spanish or english).

## 2. Data from [dataaddict.fr/prenoms](http://dataaddict.fr/prenoms)

``` javascript
node extract-first-names-from-dataaddict.js
```

will output 2 json files in data-from-dataaddict.fr folder: female.json and male.json.

## 3. Extract data from [prenoms.com](http://prenoms.com) with dataaddict data

``` javascript
node extract-data-first-name-from-prenoms.com.js
```

will output 2 json files in data-from-dataaddict.fr folder: female-with-averageAge.json and male-with-averageAge.json.

## 4. Process data from [prenoms.com](http://prenoms.com)

Extract average age

``` javascript
node extract-data-first-name-from-prenoms.com.js
```

and output txt files in data-from-dataaddict.fr folder.

Female :
- 709 first names between 36 and 80 years old
    - 0-20 years : 200
    - 20-40 years : 277
    - 40-60 years : 137
    - 60-80 years : 94

Male : 
- 581 first names between 16 and 71 years old
    - 0-20 years : 166
    - 20-40 years : 258
    - 40-60 years : 111
    - 60-80 years : 46