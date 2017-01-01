/**
 * Created by tals on 24/02/16.
 */

'use strict';

var _         = require('lodash'),
    path      = require('path'),
    moment    = require('moment-timezone'),
    async     = require('async'),
    mongoose  = require('mongoose'),
    User      = mongoose.model('User'),
    request   = require('request'),
    config    = require('./../../../../config/config');

function setSeatName(seat) {
    var seatName;
    switch(seat) {
        case 'Positive Mobile':
            seatName = 'pm';
            break;
        case 'Positive Mobile LATAM':
            seatName = 'pml';
            break;
        default:
            seatName = '';
    }
    return seatName;
}

function apiRequest(url, method, formData, callback) {
    var options = {
        url: url,
        headers: {'Authorization': 'token='+config.alertsApi.token},
        method: method,
        form: formData
    };
    request(options, function (error, response, body) {
        if(!error && response.statusCode === 200) {
            callback(null, body);
        } else {
            callback(error);
        }
    });
}

// exports.getAlertsPerSeat = function (req, res) {
//     var url = 'http://'+config.alertsApi.host+':'+config.alertsApi.port+'/api/seat/'+setSeatName(req.user.seat)+'/jobs';
//     apiRequest(url,'GET',null,function(err, result){
//         if(err) {
//             res.status(400).send({message: err});
//         } else {
//             try {
//                 res.json(JSON.parse(result));
//             } catch(err) {
//                 res.json({error: 'Error getting jobs per seat.'});
//             }
//         }
//     });
// };
//
// exports.getEvents = function (req, res) {
//     var url = 'http://'+config.alertsApi.host+':'+config.alertsApi.port+'/api/seat/'+setSeatName(req.user.seat)+'/events?flag='+req.query.flag+'&category='+req.query.category;
//     apiRequest(url,'GET',null,function(err, result){
//         if(err) {
//             res.status(400).send({message: err});
//         } else {
//             try {
//                 res.json(JSON.parse(result));
//             } catch(err) {
//                 res.json({error: 'Error getting events per seat.'});
//             }
//         }
//     });
// };
exports.getList = function (req, res) {
    User.find({})
        .limit(500)
        .exec(function (err, users) {
            if (err) {
                return res.status(400).send({
                    message: (err)
                });
            } else {
                res.json(users);
            }
        });
};
exports.getUserPage = function (req, res) {
    console.log("req.params.id: ",req.params.id);
    User.find({_id: req.params.id})
        .limit(1)
        .exec(function (err, user) {
            if (err) {
                return res.status(400).send({
                    message: (err)
                });
            } else {
                res.json(user);
            }
        });
};

// exports.bulkInsert = function (req, res) {
//     var users =
//         [
//             {
//                 "email": "tals@positivemobile.com",
//                 "displayName": "tal shitrit",
//                 "firstName": "tal shitrit",
//                 "lastName": "tal shitrit",
//                 "username": "tal shitrit",
//                 "password": 1111,
//                 "city": "yahod",
//                 "age": 31,
//                 "phone": 547392228,
//                 "capabilities": "tals@gfds.gfd",
//                 "profession": "Full stack deveoper",
//                 "webSite": "",
//                 "experience": 4,
//                 "certificates": "",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": ""
//             },
//             {
//                 "email": "Ruth.Zimbovsky72@gmail.com",
//                 "displayName": "רות זימבובסקי",
//                 "firstName": "רות זימבובסקי",
//                 "lastName": "רות זימבובסקי",
//                 "username": "רות זימבובסקי",
//                 "password": 1111,
//                 "city": "גבעתיים_תל אביב",
//                 "age": 28,
//                 "phone": 526922572,
//                 "capabilities": "פיתוח פרוייקטים, הרמת ארועים, ניהול קמפיינים באינטרנט",
//                 "profession": "פרסום באינטרנט",
//                 "webSite": "",
//                 "experience": 1,
//                 "certificates": "בגרות מלאה בקרוב תואר ראשון ביחסים בין לאומיים ומדעי החברה",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "שכיר"
//             },
//             {
//                 "email": "rachel.bazov@gmail.com",
//                 "displayName": "רחל בלה דבוסקין",
//                 "firstName": "רחל בלה דבוסקין",
//                 "lastName": "רחל בלה דבוסקין",
//                 "username": "רחל בלה דבוסקין",
//                 "password": 1111,
//                 "city": "חולון",
//                 "age": 30,
//                 "phone": "053-3309797",
//                 "capabilities": "דיגיטל",
//                 "profession": "מנהלת פרויקטים - מערכות מידע",
//                 "webSite": "",
//                 "experience": 7,
//                 "certificates": "",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "שכיר"
//             },
//             {
//                 "email": "naomi.kabesa@gmail.com",
//                 "displayName": "נעמי ליפשיץ",
//                 "firstName": "נעמי ליפשיץ",
//                 "lastName": "נעמי ליפשיץ",
//                 "username": "נעמי ליפשיץ",
//                 "password": 1111,
//                 "city": "רמת גן",
//                 "age": 35,
//                 "phone": 509917272,
//                 "capabilities": "גם באימון וניהול אדמיניסטרציה",
//                 "profession": "הנהלת חשבונות",
//                 "webSite": "",
//                 "experience": 2,
//                 "certificates": "",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "hila.moalem72@gmail.com",
//                 "displayName": "הילה מועלם",
//                 "firstName": "הילה מועלם",
//                 "lastName": "הילה מועלם",
//                 "username": "הילה מועלם",
//                 "password": 1111,
//                 "city": "כפר תבור",
//                 "age": 31,
//                 "phone": 522479197,
//                 "capabilities": "פיתוח במערכת wordpress",
//                 "profession": "פיתוח ובניית אתרי אינטרנט",
//                 "webSite": "",
//                 "experience": 3,
//                 "certificates": "תואר BSC במערכות מידע",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "barokas29@gmail.com",
//                 "displayName": "דניאל ברוקס",
//                 "firstName": "דניאל ברוקס",
//                 "lastName": "דניאל ברוקס",
//                 "username": "דניאל ברוקס",
//                 "password": 1111,
//                 "city": "תל אביב",
//                 "age": "",
//                 "phone": 542253382,
//                 "capabilities": "הרזייה וחיטוב",
//                 "profession": "מאמן כושר",
//                 "webSite": "",
//                 "experience": 10,
//                 "certificates": "מאמן כושר",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "michaelraz720@gmail.com",
//                 "displayName": "מיכאל רז",
//                 "firstName": "מיכאל רז",
//                 "lastName": "מיכאל רז",
//                 "username": "מיכאל רז",
//                 "password": 1111,
//                 "city": "תל אביב יד אליהו",
//                 "age": 42,
//                 "phone": 537132132,
//                 "capabilities": "טיפול באנשים ויזמות בנדלן ומתווך",
//                 "profession": "מאמן אישי ומתווך ויזמות בנדלן",
//                 "webSite": "",
//                 "experience": "10 שנים האימון ושנה ביזמות",
//                 "certificates": "מבית הספר ליוזמות",
//                 "businessName": "הכל תחת קורת גג אחת",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "dularachel@gmail.com",
//                 "displayName": "רחל פקמן",
//                 "firstName": "רחל פקמן",
//                 "lastName": "רחל פקמן",
//                 "username": "רחל פקמן",
//                 "password": 1111,
//                 "city": "תל אביב",
//                 "age": 41,
//                 "phone": 543232054,
//                 "capabilities": "הכנה ללידה, ליווי לידה, ליווי לאחר הלידה",
//                 "profession": "דולה, מדריכת הכנה ללידה, מלווה לאחר הלידה",
//                 "webSite": "www.rachelpeckmann.co.il",
//                 "experience": 9,
//                 "certificates": "דולה מוסמכת, דולה פוסטפארטום מוסמכת",
//                 "businessName": "רחל פקמן",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "anna.sourits@gmail.com",
//                 "displayName": "אנה סוריץ",
//                 "firstName": "אנה סוריץ",
//                 "lastName": "אנה סוריץ",
//                 "username": "אנה סוריץ",
//                 "password": 1111,
//                 "city": "באר שבע",
//                 "age": 30,
//                 "phone": 508109717,
//                 "capabilities": "הכל",
//                 "profession": "מעסה רפואית",
//                 "webSite": "",
//                 "experience": 4,
//                 "certificates": "",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "rachelshissel@gmail.com",
//                 "displayName": "רחל שיסל",
//                 "firstName": "רחל שיסל",
//                 "lastName": "רחל שיסל",
//                 "username": "רחל שיסל",
//                 "password": 1111,
//                 "city": "חולון",
//                 "age": 35,
//                 "phone": 546254072,
//                 "capabilities": "מתמחה בשינוי ובניה של המציאות מחדש.",
//                 "profession": "קאוצ׳רית. מתמחה בשינוי ובניה של המציאות מחדש.",
//                 "webSite": "",
//                 "experience": "8 שנים",
//                 "certificates": "תואר ראשון לפסיכולוגיה, מאמנת, מטפלת בקלפים טיפוליים, מדריכה באומנות",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "patrickb@bezeqint.net",
//                 "displayName": "פטריק עמרם ביתן",
//                 "firstName": "פטריק עמרם ביתן",
//                 "lastName": "פטריק עמרם ביתן",
//                 "username": "פטריק עמרם ביתן",
//                 "password": 1111,
//                 "city": "תל אביב",
//                 "age": 56,
//                 "phone": 546578648,
//                 "capabilities": "לוחמה בטרור",
//                 "profession": "חוקר באקדמיה",
//                 "webSite": "PATRICK Bettane",
//                 "experience": 30,
//                 "certificates": "תואר ראשון ושני",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "שכיר"
//             },
//             {
//                 "email": "sshani77@gmail.com",
//                 "displayName": "סמדר שני",
//                 "firstName": "סמדר שני",
//                 "lastName": "סמדר שני",
//                 "username": "סמדר שני",
//                 "password": 1111,
//                 "city": "תל אביב",
//                 "age": 39,
//                 "phone": 0,
//                 "capabilities": "כתיבת מערכי לימוד",
//                 "profession": "מורה",
//                 "webSite": "",
//                 "experience": 17,
//                 "certificates": "",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "elirap6@gmail.com",
//                 "displayName": "אלישבע אסף רפפורט",
//                 "firstName": "אלישבע אסף רפפורט",
//                 "lastName": "אלישבע אסף רפפורט",
//                 "username": "אלישבע אסף רפפורט",
//                 "password": 1111,
//                 "city": "ראשון לציון זמני",
//                 "age": 54,
//                 "phone": "054-4672091",
//                 "capabilities": "ניהול והדרכה",
//                 "profession": "ניהול פרוייקטים, הדרכה, כתיבה עיתונאית",
//                 "webSite": "",
//                 "experience": "30 בכתיבה, השרכה 8 שנים 8 שנים פרוייקטים",
//                 "certificates": "לימודי תעודה אונ ׳ בר אילן . קואוצינג מכללת גומא, תעודת עיתונאות",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "שכיר"
//             },
//             {
//                 "email": "SarahTalmi@gmail.com",
//                 "displayName": "שרה תלמי",
//                 "firstName": "שרה תלמי",
//                 "lastName": "שרה תלמי",
//                 "username": "שרה תלמי",
//                 "password": 1111,
//                 "city": "בוקה רטון",
//                 "age": 54,
//                 "phone": 5613053007,
//                 "capabilities": "עיצוב גרפי - לוגו, כתיבה",
//                 "profession": "מעצבת גרפית + קופירייטר",
//                 "webSite": "www.SarahTalmi.com",
//                 "experience": "30+",
//                 "certificates": "",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "shirleypalkar@gmail.com",
//                 "displayName": "שירלי פלקר",
//                 "firstName": "שירלי פלקר",
//                 "lastName": "שירלי פלקר",
//                 "username": "שירלי פלקר",
//                 "password": 1111,
//                 "city": "גדרה",
//                 "age": 36,
//                 "phone": 549009914,
//                 "capabilities": "שיווק ומכירות",
//                 "profession": "שיווק ומכירות ומנהלת משרד",
//                 "webSite": "",
//                 "experience": 12,
//                 "certificates": "תואר ראשון",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "שכיר"
//             },
//             {
//                 "email": "morhiedman@gmail.com",
//                 "displayName": "מרים היידמן",
//                 "firstName": "מרים היידמן",
//                 "lastName": "מרים היידמן",
//                 "username": "מרים היידמן",
//                 "password": 1111,
//                 "city": "תל אביב",
//                 "age": 31,
//                 "phone": 549876465,
//                 "capabilities": "גננת גיל הרך",
//                 "profession": "גננת",
//                 "webSite": "",
//                 "experience": 6,
//                 "certificates": "תעודת מקצוע",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "שכיר"
//             },
//             {
//                 "email": "zsheva42@gmail.com",
//                 "displayName": "זוהר בת שבע",
//                 "firstName": "זוהר בת שבע",
//                 "lastName": "זוהר בת שבע",
//                 "username": "זוהר בת שבע",
//                 "password": 1111,
//                 "city": "תל אביב",
//                 "age": 57,
//                 "phone": 525526522,
//                 "capabilities": "פרארפואית",
//                 "profession": "אחות חדר ניתוח",
//                 "webSite": "",
//                 "experience": 25,
//                 "certificates": "",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "שכיר"
//             },
//             {
//                 "email": "mr.shlonski@gmail.com",
//                 "displayName": "יהונתן שלונסקי",
//                 "firstName": "יהונתן שלונסקי",
//                 "lastName": "יהונתן שלונסקי",
//                 "username": "יהונתן שלונסקי",
//                 "password": 1111,
//                 "city": "תל אביב",
//                 "age": 42,
//                 "phone": 547899490,
//                 "capabilities": "דיקור סיני, צמחים סינים, תזונה יפנית",
//                 "profession": "רפואה סינית",
//                 "webSite": "Mail@chinese-medicine.co.il",
//                 "experience": 15,
//                 "certificates": 27176411,
//                 "businessName": "נקודה בזמן- רפואה סינית ותזונה יפנית",
//                 "comments": "",
//                 "businessAddress": "מוזיר 5, תל אביב",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "ramiaharoni1@gmail.com",
//                 "displayName": "רמי אהרוני",
//                 "firstName": "רמי אהרוני",
//                 "lastName": "רמי אהרוני",
//                 "username": "רמי אהרוני",
//                 "password": 1111,
//                 "city": "אפרת",
//                 "age": 56,
//                 "phone": 526071085,
//                 "capabilities": "מוהל מומחה",
//                 "profession": "מוהל + תיקונים",
//                 "webSite": "",
//                 "experience": 22,
//                 "certificates": "מוהל מוסמך",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "eviatar.sadan@gmail.com",
//                 "displayName": "אביתר סדן",
//                 "firstName": "אביתר סדן",
//                 "lastName": "אביתר סדן",
//                 "username": "אביתר סדן",
//                 "password": 1111,
//                 "city": "יבנה",
//                 "age": 32,
//                 "phone": 523989352,
//                 "capabilities": "אלכוהול",
//                 "profession": "חניות אלכהול וברים",
//                 "webSite": "Www.mashkaot.co.il",
//                 "experience": 13,
//                 "certificates": "",
//                 "businessName": "שר המשקאות",
//                 "comments": "החיים יפים",
//                 "businessAddress": "תובל 20 רמת גן שלבים 4 יפו אבן גבירול 35 תל אביב",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "dida1207@gmail.com",
//                 "displayName": "אפרתי דן איידה",
//                 "firstName": "אפרתי דן איידה",
//                 "lastName": "אפרתי דן איידה",
//                 "username": "אפרתי דן איידה",
//                 "password": 1111,
//                 "city": "אשדוד",
//                 "age": 70,
//                 "phone": 544556169,
//                 "capabilities": "טיפול ברפוא משלימה ולימוד ברייקי",
//                 "profession": "לימוד וחניכת ברייקי",
//                 "webSite": "",
//                 "experience": 16,
//                 "certificates": "מסטר מלמד ברייקי",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "ornarav@zahsv.net.il",
//                 "displayName": "אורנה רב-הון",
//                 "firstName": "אורנה רב-הון",
//                 "lastName": "אורנה רב-הון",
//                 "username": "אורנה רב-הון",
//                 "password": 1111,
//                 "city": "כפר-סירקין",
//                 "age": "",
//                 "phone": 523633498,
//                 "capabilities": "הוראה, כתיבה, תרגום, עריכה",
//                 "profession": "משוררת, מתרגמת, עורכת, עיתונאית, מורה",
//                 "webSite": "News1.co.il/blog/ornarav@zahav.net.il",
//                 "experience": 25,
//                 "certificates": "Msc. בספרות ובפילוספיה, תעודת הוראה",
//                 "businessName": "",
//                 "comments": "מתרגמת באופן קבוע את המאמרים של הרב, קרן, מיכאל ויעל ירדני המופיעים באתר. כן תרגמתי ספרים רבים ביניהם 72 השמות , להיות כמו הבורא.",
//                 "businessAddress": "",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "moshe.mercazi@gmail.com",
//                 "displayName": "Moshe Mercazi",
//                 "firstName": "Moshe Mercazi",
//                 "lastName": "Moshe Mercazi",
//                 "username": "Moshe Mercazi",
//                 "password": 1111,
//                 "city": "Frankfurt am Main",
//                 "age": 40,
//                 "phone": "00.49.17699171851",
//                 "capabilities": "Amazon",
//                 "profession": "Marketing and Sales",
//                 "webSite": "",
//                 "experience": 12,
//                 "certificates": "BA",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "hagaisrael13@gmail.com",
//                 "displayName": "חגי בן ישראל",
//                 "firstName": "חגי בן ישראל",
//                 "lastName": "חגי בן ישראל",
//                 "username": "חגי בן ישראל",
//                 "password": 1111,
//                 "city": "חיפה",
//                 "age": 46,
//                 "phone": 502098031,
//                 "capabilities": "בוגר מכללת נצרת עלית מיזוג וקירור  וחשמל מוסמך",
//                 "profession": "חשמלאי וטכנאי קירור ומיזוג",
//                 "webSite": "",
//                 "experience": 10,
//                 "certificates": "",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "moshe.yossef@gmail.com",
//                 "displayName": "משה יוסף",
//                 "firstName": "משה יוסף",
//                 "lastName": "משה יוסף",
//                 "username": "משה יוסף",
//                 "password": 1111,
//                 "city": "רמת גן",
//                 "age": 36,
//                 "phone": 542160687,
//                 "capabilities": "Olap, sql, tabular, erp priority",
//                 "profession": "מפתח bi, מומחה sql, מיישם פריוריטי, מפתח פריוריטי",
//                 "webSite": "",
//                 "experience": 5,
//                 "certificates": "מפתח bi, מפתח פריוריטי, מיישם פריוריטי, תואר ראשון בפיזיקה",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "שכיר"
//             },
//             {
//                 "email": "sharona.venus@gmail.com",
//                 "displayName": "שרונה פרנסקי",
//                 "firstName": "שרונה פרנסקי",
//                 "lastName": "שרונה פרנסקי",
//                 "username": "שרונה פרנסקי",
//                 "password": 1111,
//                 "city": "יפו",
//                 "age": 38,
//                 "phone": 506996856,
//                 "capabilities": "העלמת כאבים, איזון מערכת עיכול, פיריון ונשים בהריון, ילדים מגיל חצי שנה בעיקר לבעיות נשימה וחיזוק מערכת חיסונית.",
//                 "profession": "רפואה סינית: דיקור, כוסות רוח, פרחי באך והמלצה על צמחים ותוספי תזונה.",
//                 "webSite": "",
//                 "experience": 15,
//                 "certificates": "יש 6 תעודות",
//                 "businessName": "",
//                 "comments": "יישר כח",
//                 "businessAddress": "יפו",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "miriamet101@gmail.com",
//                 "displayName": "יהושע עציון",
//                 "firstName": "יהושע עציון",
//                 "lastName": "יהושע עציון",
//                 "username": "יהושע עציון",
//                 "password": 1111,
//                 "city": "ראשון לציון",
//                 "age": 52,
//                 "phone": 587755037,
//                 "capabilities": "נוסח אשכנז",
//                 "profession": "סופר סת\"ם ומלמד נערים לבר מצווה",
//                 "webSite": "miriamet101@gmail.com",
//                 "experience": 15,
//                 "certificates": "הסמכה ממשמרת סת\"ם",
//                 "businessName": "יהושע עציון",
//                 "comments": "",
//                 "businessAddress": "רחוב כפר חטים 15 ראשל\"צ",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "michelle@silky-flower.com",
//                 "displayName": "מישל צדיק",
//                 "firstName": "מישל צדיק",
//                 "lastName": "מישל צדיק",
//                 "username": "מישל צדיק",
//                 "password": 1111,
//                 "city": "מבשרת ציון",
//                 "age": 55,
//                 "phone": "050-2066887",
//                 "capabilities": "מכירות שיווק ויבוא",
//                 "profession": "יבואנית פרחי משי ודקורציה לבית",
//                 "webSite": "",
//                 "experience": 16,
//                 "certificates": "הנדסאי",
//                 "businessName": "לגעת במשי",
//                 "comments": "",
//                 "businessAddress": "הבושם 3 מבשרת",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "cohen72@gmail.com",
//                 "displayName": "Yehuda Cohen",
//                 "firstName": "Yehuda Cohen",
//                 "lastName": "Yehuda Cohen",
//                 "username": "Yehuda Cohen",
//                 "password": 1111,
//                 "city": "Tel Aviv",
//                 "age": 38,
//                 "phone": "050-724-8041",
//                 "capabilities": "Objective-c, UI/UX",
//                 "profession": "iOS Developer (iPhone/iPad applications)",
//                 "webSite": "https://www.linkedin.com/in/yehudaorencohen/",
//                 "experience": 8,
//                 "certificates": "Management Information Systems",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "ilontza@yahoo.com",
//                 "displayName": "Leah Yossef",
//                 "firstName": "Leah Yossef",
//                 "lastName": "Leah Yossef",
//                 "username": "Leah Yossef",
//                 "password": 1111,
//                 "city": "רמת גן",
//                 "age": "",
//                 "phone": 502499300,
//                 "capabilities": "הגהה",
//                 "profession": "הגהה, עריכה לשונית (עברית), שכתוב, כתיבה שיווקית",
//                 "webSite": "",
//                 "experience": 5,
//                 "certificates": "",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "שכיר"
//             },
//             {
//                 "email": "rachel.hochma@gmail.com",
//                 "displayName": "רחל חכמה",
//                 "firstName": "רחל חכמה",
//                 "lastName": "רחל חכמה",
//                 "username": "רחל חכמה",
//                 "password": 1111,
//                 "city": "ראשון לציון",
//                 "age": 42,
//                 "phone": 556672720,
//                 "capabilities": "כן",
//                 "profession": "עובדת במרכז לקבלה מכירות",
//                 "webSite": "",
//                 "experience": 12,
//                 "certificates": "",
//                 "businessName": "",
//                 "comments": "בהצלחה",
//                 "businessAddress": "",
//                 "category": "שכיר"
//             },
//             {
//                 "email": "rikishraga@gmail.com",
//                 "displayName": "רבקה שרגא",
//                 "firstName": "רבקה שרגא",
//                 "lastName": "רבקה שרגא",
//                 "username": "רבקה שרגא",
//                 "password": 1111,
//                 "city": "תל אביב",
//                 "age": 36,
//                 "phone": 525757393,
//                 "capabilities": "שיווק דיגיטלי, שיווק מסורתי, מכירות ופרסום",
//                 "profession": "מנהלת שיווק דיגיטלי, עם ניסיון רב במכירות ופרסום",
//                 "webSite": "",
//                 "experience": 10,
//                 "certificates": "",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "gal.peri87@gmail.com",
//                 "displayName": "גל פרי",
//                 "firstName": "גל פרי",
//                 "lastName": "גל פרי",
//                 "username": "גל פרי",
//                 "password": 1111,
//                 "city": "כפר יונה",
//                 "age": 29,
//                 "phone": 502231828,
//                 "capabilities": "קליל חלונות מעוצבים",
//                 "profession": "אדריכלית,מעצבת פנים, יועצת אלומיניום",
//                 "webSite": "",
//                 "experience": 2,
//                 "certificates": "פיקוח בניה, הנדסאי אדריכלות ועיצוב פנים",
//                 "businessName": "קליל חלונות מעוצבים",
//                 "comments": "",
//                 "businessAddress": "נתניה",
//                 "category": "שכיר"
//             },
//             {
//                 "email": "neomika86@gmail.com",
//                 "displayName": "נעמי ברנט",
//                 "firstName": "נעמי ברנט",
//                 "lastName": "נעמי ברנט",
//                 "username": "נעמי ברנט",
//                 "password": 1111,
//                 "city": "חולון",
//                 "age": "",
//                 "phone": 527919292,
//                 "capabilities": "בדיקת תוכנה,web, crm",
//                 "profession": "בדיקת תוכנה",
//                 "webSite": "",
//                 "experience": 6,
//                 "certificates": "",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "שכיר"
//             },
//             {
//                 "email": "naama_shmuel@walla.com",
//                 "displayName": "נעמה שמואל",
//                 "firstName": "נעמה שמואל",
//                 "lastName": "נעמה שמואל",
//                 "username": "נעמה שמואל",
//                 "password": 1111,
//                 "city": "תל אביב",
//                 "age": "",
//                 "phone": "050-8454251",
//                 "capabilities": "איפור / עיצוב פנים",
//                 "profession": "איפור מקצועי\nעיצוב פנים",
//                 "webSite": "",
//                 "experience": 10,
//                 "certificates": "",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "shlomitbibi@gmail.com",
//                 "displayName": "שולמית ביבי בר",
//                 "firstName": "שולמית ביבי בר",
//                 "lastName": "שולמית ביבי בר",
//                 "username": "שולמית ביבי בר",
//                 "password": 1111,
//                 "city": "צפריה",
//                 "age": 38,
//                 "phone": "050-2919532",
//                 "capabilities": "דיקור",
//                 "profession": "מטפלת ברפואה סינית, שיאצו, הילינג, ביואורוגונומי",
//                 "webSite": "",
//                 "experience": 10,
//                 "certificates": "מטפלת מומסכת",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "inbalim2@gmail.com",
//                 "displayName": "Inbal",
//                 "firstName": "Inbal",
//                 "lastName": "Inbal",
//                 "username": "Inbal",
//                 "password": 1111,
//                 "city": "ראש פינה",
//                 "age": 34,
//                 "phone": 508680007,
//                 "capabilities": "אימון אישי",
//                 "profession": "קאוצ'ינג, ייעוץ קריירה, הנחיית קבוצות, מדיטציות באמצעות מוסיקה ונגינה על כלים תרפוייטים.",
//                 "webSite": "",
//                 "experience": 10,
//                 "certificates": "תואר ראשון, מנחת קבוצות, קואצ'ינג.",
//                 "businessName": "סעדי",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "rinanis@walla.co.il",
//                 "displayName": "רינה ניסימוב",
//                 "firstName": "רינה ניסימוב",
//                 "lastName": "רינה ניסימוב",
//                 "username": "רינה ניסימוב",
//                 "password": 1111,
//                 "city": "בני-ברק",
//                 "age": 38,
//                 "phone": 586930003,
//                 "capabilities": "הנה\"ח, ריקוד, אימון אישי וזוגי",
//                 "profession": "מנהלת חשבונות ומאמנת ליחסים וזוגיות",
//                 "webSite": "rina-love",
//                 "experience": 10,
//                 "certificates": "תואר בסוציולוגיה ומידענות, הנה\"ח סוג 3 ומאמנת זוגית",
//                 "businessName": "rina-love",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "שכיר"
//             },
//             {
//                 "email": "stella67@walla.com",
//                 "displayName": "סטלה שלטי",
//                 "firstName": "סטלה שלטי",
//                 "lastName": "סטלה שלטי",
//                 "username": "סטלה שלטי",
//                 "password": 1111,
//                 "city": "תל אביב",
//                 "age": "",
//                 "phone": 522778856,
//                 "capabilities": "מתמטיקה",
//                 "profession": "מורה למתמטיקה בתיכון",
//                 "webSite": "",
//                 "experience": 29,
//                 "certificates": "תואר שני בחינוך+תעודת הוראה",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "שכיר"
//             },
//             {
//                 "email": "roy7805@gmail.com",
//                 "displayName": "רועי לוי",
//                 "firstName": "רועי לוי",
//                 "lastName": "רועי לוי",
//                 "username": "רועי לוי",
//                 "password": 1111,
//                 "city": "חולון/ת\"א",
//                 "age": 30,
//                 "phone": 506761301,
//                 "capabilities": "ראיית חשבון",
//                 "profession": "בוגר מנהל עסקים-חשבונאות",
//                 "webSite": "",
//                 "experience": "שנתיים",
//                 "certificates": "בגרות,BA מנהל עסקין",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "שכיר"
//             },
//             {
//                 "email": "dagulpianos@gmail.com",
//                 "displayName": "שלומי דגול",
//                 "firstName": "שלומי דגול",
//                 "lastName": "שלומי דגול",
//                 "username": "שלומי דגול",
//                 "password": 1111,
//                 "city": "אור יהודה",
//                 "age": "",
//                 "phone": 504244764,
//                 "capabilities": "טובה",
//                 "profession": "מכירת פסנתרים כיוון ותיקון",
//                 "webSite": "",
//                 "experience": 7,
//                 "certificates": "תעודת בוגר",
//                 "businessName": "דגול פסנתרים",
//                 "comments": "",
//                 "businessAddress": "מושב חמד",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "irenaarono@gmail.com",
//                 "displayName": "אירנה ארונוב",
//                 "firstName": "אירנה ארונוב",
//                 "lastName": "אירנה ארונוב",
//                 "username": "אירנה ארונוב",
//                 "password": 1111,
//                 "city": "רחובות",
//                 "age": 31,
//                 "phone": 543131393,
//                 "capabilities": "שיווק דיגיטלי",
//                 "profession": "שיווק דיגיטלי, בניית אתרים, קידום אתרים",
//                 "webSite": "",
//                 "experience": 5,
//                 "certificates": "קידום אתרים, webmaster",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "שכיר"
//             },
//             {
//                 "email": "moranalon8@gmail.com",
//                 "displayName": "מורן אלון רוה",
//                 "firstName": "מורן אלון רוה",
//                 "lastName": "מורן אלון רוה",
//                 "username": "מורן אלון רוה",
//                 "password": 1111,
//                 "city": "גבעתיים",
//                 "age": 33,
//                 "phone": "050-5989450",
//                 "capabilities": "תאטרון, משחק מול מצלמה,ריקוד, הדרכה עם ילדים ומבוגרים",
//                 "profession": "שחקנית",
//                 "webSite": "",
//                 "experience": 6,
//                 "certificates": "בוגרת ניסן נתיב וכיום לומדת בנוסף טיפול בתנועה בוינגייט",
//                 "businessName": "מורן אלון רוה- שחקנית",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "merav93@gmail.com",
//                 "displayName": "מירב נ°גה ויצמן",
//                 "firstName": "מירב נ°גה ויצמן",
//                 "lastName": "מירב נ°גה ויצמן",
//                 "username": "מירב נ°גה ויצמן",
//                 "password": 1111,
//                 "city": "חיפה",
//                 "age": 23,
//                 "phone": 542586887,
//                 "capabilities": "מכירות",
//                 "profession": "מזכירות,  מכירות ומחשבים",
//                 "webSite": "",
//                 "experience": 5,
//                 "certificates": "",
//                 "businessName": "גב נ°ח",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "שכיר"
//             },
//             {
//                 "email": "tomer1275@gmai.com",
//                 "displayName": "תומר דהן",
//                 "firstName": "תומר דהן",
//                 "lastName": "תומר דהן",
//                 "username": "תומר דהן",
//                 "password": 1111,
//                 "city": "תל אביב",
//                 "age": 41,
//                 "phone": 546211584,
//                 "capabilities": "מממ",
//                 "profession": "בעל מסעדה, מורה לימאות",
//                 "webSite": "",
//                 "experience": 15,
//                 "certificates": "",
//                 "businessName": "בורגרים",
//                 "comments": "",
//                 "businessAddress": "הרצל 7 תל אביב",
//                 "category": "שכיר"
//             },
//             {
//                 "email": "roni@ronilaw.co.il",
//                 "displayName": "רוני הראלי, עו\"ד",
//                 "firstName": "רוני הראלי, עו\"ד",
//                 "lastName": "רוני הראלי, עו\"ד",
//                 "username": "רוני הראלי, עו\"ד",
//                 "password": 1111,
//                 "city": "תל אביב",
//                 "age": 49,
//                 "phone": "03-6935290, 054-4566223",
//                 "capabilities": "נדל\"ן על כל תחומי הנדל\"ן, הוצאה לפועל, שירותים נוטריוניים",
//                 "profession": "עורך-דין בתחומי נדל\"ן, מקרקעין, הוצאה לפועל, פשיטות רגל, נוטריון",
//                 "webSite": "ronilaw.co.il",
//                 "experience": 23,
//                 "certificates": "עו\"ד, מגשר,",
//                 "businessName": "רוני הראלי, משרד עורכי דין ונוטריון",
//                 "comments": "",
//                 "businessAddress": "רחוב ברקוביץ 4, מגדל המוזיאון, קומה 6, תל אביב",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "netafd@gmail.com",
//                 "displayName": "נטע בסון",
//                 "firstName": "נטע בסון",
//                 "lastName": "נטע בסון",
//                 "username": "נטע בסון",
//                 "password": 1111,
//                 "city": "פתח תקווה",
//                 "age": 31,
//                 "phone": 523492426,
//                 "capabilities": "מטפלת במגוון רחב של בעיות",
//                 "profession": "מטפלת ברפואה סינית- שיאצו, דיקור וצמחי מרפא",
//                 "webSite": "www.refua-neto.co.il",
//                 "experience": 5,
//                 "certificates": "",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "naomisrael13@gmail.com",
//                 "displayName": "נעמי בן ישראל",
//                 "firstName": "נעמי בן ישראל",
//                 "lastName": "נעמי בן ישראל",
//                 "username": "נעמי בן ישראל",
//                 "password": 1111,
//                 "city": "חיפה",
//                 "age": 35,
//                 "phone": 543232034,
//                 "capabilities": "בתי חולים שנה",
//                 "profession": "דולה תומכת לידה ומשווקת מוצרי אלוורה מבית פוראוור",
//                 "webSite": "",
//                 "experience": 3,
//                 "certificates": "",
//                 "businessName": "",
//                 "comments": "",
//                 "businessAddress": "",
//                 "category": "עצמאי"
//             },
//             {
//                 "email": "marcelogtm@gmail.com",
//                 "displayName": "Marcelo cunio",
//                 "firstName": "Marcelo cunio",
//                 "lastName": "Marcelo cunio",
//                 "username": "Marcelo cunio",
//                 "password": 1111,
//                 "city": "רמת גן",
//                 "age": 47,
//                 "phone": 546998850,
//                 "capabilities": "מנהל עסקים",
//                 "profession": "עצמאי בית קפה אילנס",
//                 "webSite": "",
//                 "experience": 20,
//                 "certificates": "תואר ראשון מנהל עסקים",
//                 "businessName": "קפה אילנס",
//                 "comments": "",
//                 "businessAddress": "נתב״ג",
//                 "category": "עצמאי"
//             }
//         ];
//
//     async.each(users, function(u, callback){
//         console.log(u);
//         var user = new User(u);
//         console.log(user);
//
//         user.save(function(err, res){
//             callback(err, res);
//         });
//     }, function(err){
//         console.log('DONE!');
//     });
// };

//
// exports.updateEvents = function (req, res) {
//     var url = '';
//     if(req.body && req.body['programmatic-demand'] || req.body['programmatic-supply'] || req.body.direct) {
//         url = 'http://'+config.alertsApi.host+':'+config.alertsApi.port+'/api/seat/'+setSeatName(req.user.seat)+'/event/category/activate_all';
//         var form = { categoryData: req.body };
//         apiRequest(url,'POST',form,function(err, result){
//             if(err) {
//                 res.status(400).send({message: err});
//             } else {
//                 res.send(result);
//             }
//         });
//     } else {
//         url = 'http://'+config.alertsApi.host+':'+config.alertsApi.port+'/api/seat/'+setSeatName(req.user.seat)+'/event/'+req.body._id+'/activate?manual=true';
//         apiRequest(url,'POST',null,function(err, result){
//             if(err) {
//                 res.status(400).send({message: err});
//             } else {
//                 res.send(result);
//             }
//         });
//     }
// };

