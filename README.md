# CSIA Mealbot (Instagram)

## Configure

### Account
To start, place config.json in the root of the project directory with the following content:
```json
{
    "username": "USERNAME",
    "password": "PASSWORD"
}
```
### School
Find your school ID on NEIS, and replace the region information in ``getMeal`` function from ``fetch.js``.

```js
const getMeal = (date) => {
    return new Promise((resolve, reject) => {
        const school = new School()
        const schoolCode = 'YOUR_CODE_HERE'
        school.init(School.Type.HIGH, School.Region.GYEONGGI, schoolCode);
        ...
}
```

The source uses CSIA as default.

### Font Setup

The source is set to use Spoqa Han Sans, and you will have to manually download the font and place them under ``resources`` directory at root.

Rename the references as you need them in ``render.js``.

## How to use

Of course, start by running ``npm install``.

Running the script index.js via ``npm run start`` will upload all menus to instagram as story.

The designed use is to run is as a cronjob every morning as it grabs the data with the reference to the current date.
