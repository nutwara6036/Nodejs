
// Nodejs encryption with CTR
//aes-256-ctr
//aes-128-cbc
var crypto = require('crypto'),
    algorithm = 'aes-128-cbc',
    password = 'mypssword';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

/*var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
var mystr = mykey.update('abc', 'utf8', 'hex')
mystr += mykey.final('hex');

console.log(mystr); //34feb914c099df25794bf9ccb85bea72*/

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

/*var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
var mystr = mykey.update('34feb914c099df25794bf9ccb85bea72', 'hex', 'utf8')
mystr += mykey.update.final('utf8');
fdfs
console.log(mystr); //abc*/

//outputs hello world
//console.log(encrypt("abc"));
var content = "abc";
console.log("DATA :"+ content);

var data = encrypt(content);
console.log("ENCRYPT :"+ data); //output :ca4d0fde764ab688a19b6c6772f5177d

var datas = decrypt(data);
console.log("DECRYPT :"+ datas); // send output :ca4d0fde764ab688a19b6c6772f5177d = abc

