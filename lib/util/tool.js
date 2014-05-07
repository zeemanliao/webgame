/*
	注意,此目錄修改不會重啟Node
*/
module.exports = {
	check:function(d){
		if (typeof d === 'undefined' || d == null)
			return false;
		return true;
	},
	checkNum:function(d,n1,n2){
		if (!this.check(d))
			return false;
		if (isNaN(d))
			return false;
		if (n1 != null && d<n1){
			return false;
		}
		if (n2 != null && d>n2)
			return false;
		return true;
	},
	getRnd:function(min,max){
		//2 100
		try{
			if (!max){
				max = min;
				min = 1;
			}

			if (!min)
				min=0;
			if (max)
				max -=min+1;
			
				min+=0;
				max+=0;

			return Math.floor((Math.random()*max)+min);
		} catch(e){
			console.log('亂數取得錯誤,min:,max:',min,max);
		}
		return 0;
	}
}