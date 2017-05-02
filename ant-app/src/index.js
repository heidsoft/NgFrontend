import dva from 'dva';
import './index.css';

// 1. Initialize
//const app = dva();
const app = dva({
  initialState: {
     products: [
       { name: 'dva', id: 1 },
       { name: 'antd', id: 2 },
     ],
   },
});


// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));
app.model(require('./models/products'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');


let add = (a,b)=> a+b;

console.log(add);

console.log(add(1,2));

let numbers = [1,2,3];
let doubleNumbers = numbers.map((number) => number * 2);
console.log(doubleNumbers);

var age = 2;
//在对象方法的嵌套函数中，this会指向global对象
let showMe1 = {
  age:1,
  grow:function(){
    setTimeout(function(){
      console.log("--------showMe1-start--------");
      console.log(++this.age);
      console.log("--------showMe1-end--------\n");
    },100);
  }
};

showMe1.grow();



let showMe2 = {
  age:1,
  grow:function(){
    const self = this;
    setTimeout(function(){
      console.log("--------showMe2-start--------");
      console.log(++self.age);
      console.log("--------showMe2-end--------\n");
    },100);
  }
};

showMe2.grow();


let showMe3 = {
  age:1,
  grow:function(){
    setTimeout(()=>{
      console.log("--------showMe3-start--------");
      console.log(++this.age);
      console.log("--------showMe3-end--------\n");
    },100);
  }
};
showMe3.grow();

function desc(name="heidsoft",age=18){
  return name + ' is ' + age + ' years old';
}

console.log(desc());
console.log(desc('jake',20));
