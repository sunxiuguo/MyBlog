// 题目描述
// 输入一个字符串,按字典序打印出该字符串中字符的所有排列。
// 例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba。

// 输入描述:
// 输入一个字符串,长度不超过9(可能有字符重复),字符只包括大小写字母。



// 回溯法
// 也就是利用树去尝试不同的可能性，不断地去字符串数组里面拿一个字符出来拼接字符串，当字符串数组被拿空时，就把结果添加进结果数组里，然后回溯上一层
// （通过往数组加回去字符以及拼接的字符串减少一个来回溯。）
function Permutation(str) {
    let res=[],pStr="";
    if(str.length<=0) return res;
    arr=str.split("");//将字符串转化为字符数组
    res=permutate(arr,pStr,res);
    return res;
}

function permutate(arr,pStr,res){
    if(arr.length==0){
        return res.push(pStr);
    }else{
        let isRepeated=new Set();
        for(let i=0;i<arr.length;i++){
            if(!isRepeated.has(arr[i])){//避免相同的字符交换
                let char=arr.splice(i,1)[0];
                pStr+=char;
                permutate(arr,pStr,res);
                arr.splice(i,0,char);//恢复字符串，回溯
                pStr=pStr.slice(0,pStr.length-1);//回溯                
                isRepeated.add(char);
            }
        }
    }
    return res;
}



// 递归全排列法：
// 就是剑指offer上的做法，也比较容易理解，不过挺少人答的也就是
// 把字符串分为两部分：第一部分为第一个字符，第二部分为第一个字符以后的字符串。
// 然后接下来求后面那部分的全排列。
// 再将第一个字符与后面的那部分字符逐个交换
function Permutation(str) {
    let res=[];
    if(str.length<=0) return res;
    arr=str.split("");//将字符串转化为字符数组
    res=permutate(arr,0,res);
    res=[...new Set(res)];
    res.sort();
    return res;
}
function permutate(arr,index,res){
    if(arr.length==index){
        let s="";
        for(let i=0;i<arr.length;i++){
            s+=arr[i];
        }
        return res.push(s);
    }else{
        for(var i=index;i<arr.length;i++){
            // 如图 需要交换两次
            [arr[index],arr[i]]=[arr[i],arr[index]];
            permutate(arr,index+1,res);
            [arr[index],arr[i]]=[arr[i],arr[index]];
        }
    }
    return res;
}