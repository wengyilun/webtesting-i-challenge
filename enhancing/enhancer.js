module.exports = {
  succeed,
  fail,
  repair,
  get,
  convertToNumber,
  applyBounds
};


function convertToNumber(item){
  let durability, enhancement
  if (isNaN(parseInt(item.durability))){
    durability = 0
  }else{
    durability = Math.min(Math.max(parseInt(item.durability), 0), 100);
  }

  if (isNaN(parseInt(item.enhancement))){
    enhancement = 0
  }else{
    enhancement = Math.min(Math.max(parseInt(item.enhancement), 0), 20);
  }
  return { ...item,
    enhancement: enhancement,
    durability: durability
  }
}

function applyBounds(item){
  let durability, enhancement
  durability = Math.min(Math.max(parseInt(item.durability), 0), 100);
  enhancement = Math.min(Math.max(parseInt(item.enhancement), 0), 20);
  return { ...item,
    enhancement: enhancement,
    durability: durability
  }
}

function succeed(item) {
  let _item = convertToNumber(item)
  return applyBounds({..._item, enhancement: ++_item.enhancement})
}

function fail(item) {
  let _item = convertToNumber(item)
  
  if (_item.enhancement < 15){
    _item.durability -= 5
  }else{
    if (_item.enhancement > 16){
      _item.enhancement -= 1;
    }
    _item.durability -= 10
  }
  
  
  return  applyBounds({ ..._item})
}

function repair(item) {
  const _item = convertToNumber(item)
  return { ..._item, durability: 100 };
}

function get(item) {
  return { ...item };
}
