const year = '2017'; 
const month = '09'; 
const day = '21'; 

let template = '${year}-${month}-${day}';
let context = { year, month, day };

function render(template) {
    return function(context) {
        return template.replace(/\$\{(.*?)\}/g, (match, key) => context[key]);
    }
}

const str = render(template)({year,month,day}); 

console.log(str)