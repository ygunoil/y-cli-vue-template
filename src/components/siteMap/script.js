import {mapState} from 'vuex'
import {arr} from './data'
export default {
  data(){
    return {
     
    }
  },
  mounted(){
	console.log(arr)
	 $(function(){
        	let html=''
        	$.each(arr,(index,item)=>{
        		html+=`
		        		<div class="mp mp${index+1}">
		            <div class="feng">
		                <div class="tree">
		                    <div class="sang">
		                    </div>
		                    <div class="boou">
		                        <img src="${item.imgsrc}" alt="" /></div>
			                     <div class="du_size">
			                        <p>地址:${item.address}</p>
			                        <p>电话:${item.tel}</p>
			                        <p>QQ:${item.qq}</p>
			                    </div>
		                    </div>
		                </div>
			            <div class="mito find_mi1">${item.name}</div>
			        </div>
		        </div>
        		`
        	})
        	$(".m_map").html(html)
			$(".mp").mouseover(function () {
                $(this).find(".feng").show();
            }).mouseout(function () {
                $(this).find(".feng").hide();

            });
		})
  },
  methods:{
    
  },
//computed:mapState([
//  "classList"
//]),
  computed:{
    
  },
  components:{
    
  },
  watch:{
    
  }
}
