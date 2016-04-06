var hljs = require('highlight.js'),
    nl2br = require('nl2br'),
    marked = require('meta-marked'),
    fs = require('fs'),
    extend = require('util')._extend;

marked.setOptions({
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});

var courses =
    {
        '/': { title: 'Overview' },
        'getting-started': { title: 'Getting setup', lessons:
            {
                'introduction': { title: 'Introduction' },
                'what-is-the-web': { title: 'What is the web?' }
            }
        },
        'xss': { title: 'XSS', lessons:
            {
                'cross-site-scripting': { title: 'Cross-site scripting' },
                'your-first-exploit': { title: 'Your first exploit' },
                'leveraging-your-exploit': { title: 'Leveraging your exploit' },
                'patching-the-hole': { title: 'Patching the hole' }
            }
        },
        'injection': { title: 'Injection', lessons:
            {
                'sqli': { title: 'SQLi' },
                'your-first-exploit': { title: 'Your first injection' },
                'extracting-data': { title: 'Extracting data' },
                'fixing-the-exploit': { title: 'Fixing the exploit' }
            }
        },
        'csrf': { title: 'CSRF', lessons:
            {
                'corss-site-request-forgery': { title: 'Cross-site request forgery' },
                'exploiting-iframes': { title: 'Exploiting iframes' }
            }
        }
    };

exports.view = function(req, res) {
    var file,
        tmpCourses = JSON.parse(JSON.stringify(courses)),
        layout = req.xhr ? false : 'layout';
        course = req.params.course,
        lesson = req.params.lesson;

    if (course && lesson) {
        file = 'courses/' + course + '/' + lesson + '.md';
        tmpCourses[course].selected = true;
        tmpCourses[course].lessons[lesson].selected = true;
    } else {
        file = 'courses/index.md';
        tmpCourses['/'].selected = true;
    }

    fs.readFile(file, function (err, data) {
        if (err) {
            console.log('File not found');
            return;
        }
        var md = data.toString(),
            article = marked(md),
            title = article.meta.title || md.split('\n')[0].replace('# ', '');

        var variables = {
            title: title,
            content: article.html,
            courses: tmpCourses,
            breadcrumb: true,
            extra: {
                classes: 'course course--index',
                styles: ['/css/highlightjs.css']
            },
            layout: layout
        }

        console.log(article.meta);

        if (layout) {
            res.render('course', variables);
        } else {
            res.render('course', variables, function(err, html) {
                res.send({
                    title: title,
                    content: html
                });
            });
        }
    });
};

function tabs(value) {
    return value.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
}