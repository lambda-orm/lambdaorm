(async () => { 

const {exp} = await require("./exp.js");
node = exp.parse("User.filter(p=> p.sex=='Male')"+
                "     .sort(p=> [p.lastname,p.name]) "+
                "     .map(p=> {name: p.firstname+p.lastname,email:p.email})");
console.log(exp.serialize(node))

operand = exp.compile(node);
console.log(exp.serialize(operand))


})();
