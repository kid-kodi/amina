var yourFilter = angular.module('spa');

yourFilter.filter("groupingFilter", function () {

    return function (orig, same, getID) {
        if (!(orig instanceof Array)) return orig;
        if (orig.length == 0) return orig;

        var result = [];

        var cur = [];
        var i = 0;
        for (i = 0; i < orig.length; i ++) {
            if (i == 0 || same(orig[i], orig[i-1])) {
                cur.push(orig[i]);
            } else {
                result.push({
                    id: getID(orig[i-1]),
                    items: cur
                });

                cur = [orig[i]];
            }

        }
        result.push({
            id: getID(orig[orig.length - 1]),
            items: cur
        });

        var toKey=function(item){
            return moment(item.created_at).format("YYYY-MM-DD");
          };

        function pushtoexists(itemDateMap,item,date){
            for(var j=0; j<itemDateMap.length; j++){
                if(itemDateMap[j].date == date){
                    itemDateMap[j].item.push(item);
                    return true;
                }
            }
            return false;
        }
        function push_item(itemDateMap,item,date){
            itemDateMap.push({
                'date':date,
                'item':[item]
            });
        }
        var addArrayToMap = function(items){
            var itemDateMap = [];

            for(var i=0; i<items.length; i++){
                var item = items[i]; 
                var date = toKey(item);

                var push_obj = pushtoexists(itemDateMap,item,date);
                if(itemDateMap.length == 0 || push_obj== false){
                    push_item(itemDateMap,item,date);
                }

            }

            return {
                "data_list":itemDateMap,
                };
          };


        for (i = 0; i < result.length; i ++) {
            var map = addArrayToMap(result[i].items);
            result[i].data = map.data_list;
            result[i].$$hashKey = i;

        }


        return result;
    };
});