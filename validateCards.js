// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
valid1, valid2, valid3, 
valid4, valid5, 
invalid1, invalid2, invalid3,
invalid4, invalid5, 
mystery1, mystery2, 
mystery3, mystery4, mystery5
];

//Luhn's CC algorithm:---------------------------
const luhnAlgo = (array)=>{
    let total = 0;
    let lastElement = array.length -1;
    for (let i = lastElement; i >= 0; i--) {
      if ((lastElement - i) % 2 === 1) {//if odd iteration:
        array[i] *= 2;
        if (array[i] > 9) {
            array[i] -= 9;
        }
      }
      total += array[i];
    }

    return total % 10 === 0;
    }
//------------------------------------------------    
const findInvalidCards = (array)=>{
        let invalids = [];
        for(let i = 0; i < array.length-1; i++){
            let res = luhnAlgo(array[i]);
            if(res===true){
                continue;
            }
            invalids.push(array[i]);
        }
        
        return invalids;
    }


const companies = [
    
   Amex = {
    id : 3,
    coName : 'Amex (American Express)',
    corruptedCCNumbers : false
   },
   Visa = {
    id : 4,
    coName : 'Visa',
    corruptedCCNumbers : false
   },
   Mastercard = {
    id : 5,
    coName : 'Mastercard',
    corruptedCCNumbers : false
   },
   Discover = {
    id : 6,
    coName : 'Discover',
    corruptedCCNumbers : false
   }

];


const validateCred = (array)=>{
   let looned = luhnAlgo(array);
   return looned
}


//object param should have properties of : id, coName .
const idInvalidCardCompanies = (array, object) =>{
    let badCompanySet= new Set(); //entries must be unique
    let invalids = findInvalidCards(array);
    for(let i = 0; i < invalids.length; i++){
        
        if(invalids[i][0]===object[0].id){
            console.log('invalid amex # found: ' + invalids[i][0])
            badCompanySet.add(object[0].coName);
            continue;
        }
        if(invalids[i][0]===object[1].id){
            console.log('invalid visa # found: '+ invalids[i][0])
            badCompanySet.add(object[1].coName);
            continue;
        }
        if(invalids[i][0]===object[2].id){
            console.log('invalid mastercard # found: '+ invalids[i][0])
            badCompanySet.add(object[2].coName);
            continue;
        }
        if(invalids[i][0]===object[3].id){
            console.log('inv Discover # found: '+ invalids[i][0])
            badCompanySet.add(object[3].coName);
            continue;
        }
        else{
             console.warn(invalids[i][0] + ' : id / company not found');
             continue;
        }
    }
        return badCompanySet;
}





//TESTS--------------------------------------------------------------------




console.log('---------------')
console.log('BEGIN VALIDS:')
console.log('---------------')
console.log('result: '+ validateCred(valid1));
console.log('---------------')

console.log('result: '+ validateCred(valid2));
console.log('---------------')
console.log('result: '+ validateCred(valid3)); 
console.log('---------------')
console.log('result: '+ validateCred(valid4));
console.log('---------------')
console.log('result: '+ validateCred(valid5)); 
console.log('---------------')


console.log('BEGIN INVALIDS:')
console.log('---------------')
console.log('result: '+ validateCred(invalid1));
console.log('---------------')
console.log('result: '+ validateCred(invalid2)); 
console.log('---------------')
console.log('result: '+ validateCred(invalid3)); 
console.log('---------------')
console.log('result: '+ validateCred(invalid4)); 
console.log('---------------')

console.log(findInvalidCards(batch))
console.log(idInvalidCardCompanies(batch, companies))
