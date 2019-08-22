const IgApiClient = require('instagram-private-api').IgApiClient;
const {
    username,
    password
} = require('./config.json');

const render = require('./render.js');
const getMeal = require('./fetch.js');

const ig = new IgApiClient();

async function login() {
    ig.state.generateDevice(username);
    await ig.simulate.preLoginFlow();
    await ig.account.login(username, password);
    process.nextTick(async () => await ig.simulate.postLoginFlow());
}

(async () => {
    console.log("Logging in...");
    await login();
    console.log("Complete!");
    console.log("Fetching meal data...");
    const mealData = await getMeal(new Date());
    console.log("Complete!");
    console.log("Uploading 조식...");
    await uploadStoryWithMedia(render(mealData, '조식'));
    console.log("Uploading 중식...");
    await uploadStoryWithMedia(render(mealData, '중식'));
    console.log("Uploading 석식...");
    await uploadStoryWithMedia(render(mealData, '석식'));
    console.log("Uploading 간식...");
    await uploadStoryWithMedia(render(mealData, '간식'));
    console.log("Done!");
})();

async function uploadStoryWithMedia(file) {
    return await ig.publish.story({
        file
    });
}