const {
    registerFont,
    createCanvas
} = require('canvas');

registerFont(`${__dirname}/resources/NanumMyeongjo-Regular.ttf`, {
    family: 'NanumMyeongjo'
});
registerFont(`${__dirname}/resources/NanumMyeongjo-Bold.ttf`, {
    family: 'NanumMyeongjo',
    weight: 'bold'
});
registerFont(`${__dirname}/resources/SpoqaRegular.ttf`, {
    family: 'Spoqa Han Sans'
});
registerFont(`${__dirname}/resources/SpoqaBold.ttf`, {
    family: 'Spoqa Han Sans',
    weight: 'bold'
});
registerFont(`${__dirname}/resources/SpoqaThin.ttf`, {
    family: 'Spoqa Han Sans',
    weight: 'thin'
});
registerFont(`${__dirname}/resources/SpoqaLight.ttf`, {
    family: 'Spoqa Han Sans',
    weight: 'light'
});

const render = (mealData, meal) => {

    const canvas = createCanvas(1080, 1920);
    const ctx = canvas.getContext('2d');

    const date = new Date(mealData.date);
    const dateString = `${date.getMonth() + 1}월 ${date.getDate()}일`;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#000';
    ctx.strokeStyle = '#000'

    var stacking = 350;

    ctx.font = "bold 100px 'Spoqa Han Sans'";
    ctx.fillText(`오늘의 급식`, 75, stacking);
    ctx.fillRect(75, stacking += 30, canvas.width - 75, 10);

    ctx.font = "thin 50px 'Spoqa Han Sans'";
    ctx.fillText(dateString, 75, stacking += 75);
    stacking += 100;
    const menus = mealData[meal];
    ctx.font = "bold 80px 'Spoqa Han Sans'";
    ctx.fillText(meal, 150, stacking += 100);
    ctx.font = "thin 80px 'Spoqa Han Sans'";
    stacking += 50;

    for (menu of menus) {
        ctx.fillText(menu, 150, stacking += 90);
    }

    const buffer = canvas.toBuffer('image/jpeg', {
        quality: 1
    });

    return buffer;
}

module.exports = render;