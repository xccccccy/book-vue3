import{_ as S}from"./index.698ee66b.js";import{_ as g}from"./plugin-vue_export-helper.21dcd24c.js";import{o as i,e as b,f as o,t as c,n as B,D as d,J as C,s as N,A as I,B as j,u as k,y as u,F as z,I as E,K as F,p as O,j as V,c as f,g as D,k as m}from"./vendor.d34d5b7e.js";/* empty css                        *//* empty css               *//* empty css                  */import{a as P}from"./index.15c82977.js";import{$ as a}from"./jquery.67aab4a5.js";const T={name:"cataloguebox",props:["catalogue_text","index","catalogue_href"],methods:{select_book(e){console.log(e)}}},A={class:"cataloguebox"},J={class:"catalogue"},M=["href"];function L(e,s,l,x,t,n){return i(),b("div",A,[o("div",J,[o("a",{href:l.catalogue_href},c(l.catalogue_text),9,M)])])}var p=g(T,[["render",L],["__scopeId","data-v-17ad82fc"]]),R=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"}));const K=B(()=>S(()=>Promise.resolve().then(function(){return R}),void 0)),Z={name:"bookinfo",data(){return{bookboxshow:!1,book:{book_id:this.$route.params.book_id,book_name:"\u4E66\u7C4D\u540D\u79F0",book_author:"\u67D0\u67D0\u67D0",book_resume:"\u7B80\u4ECB",book_img_url:null,catalogue_text_list:null,catalogue_href_list:null,bookshelf:null},continueread_catalogue_id:1,continueread_show:!1,backimg:"url('/back3.jpeg') center center / cover fixed no-repeat"}},mounted(){P.get("/api/bookinfo/"+this.book.book_id).then(e=>{this.bookboxshow=!0,this.book=e.data,document.title=this.book.book_name,this.backimg="url("+e.data.book_img_url+") center center / cover no-repeat"}).catch(e=>{d({message:"\u8BF7\u6C42\u5931\u8D25\uFF01\u8BF7\u5237\u65B0\uFF01",type:"error",duration:0}),console.log(e)}),localStorage.bookshelf||(localStorage.bookshelf="{}"),this.bookshelf=JSON.parse(localStorage.bookshelf),this.bookshelf[this.book.book_id]&&(this.continueread_show=!0,this.continueread_catalogue_id=this.bookshelf[this.book.book_id].catalogue_id)},methods:{joinbookshelf(){this.bookshelf[this.book.book_id]?d({message:"\u4E66\u7C4D\u5DF2\u7ECF\u52A0\u5165\u4E66\u67B6\u4E86\uFF01",type:"info",duration:1200}):(this.bookshelf[this.book.book_id]={book_id:this.book.book_id,name:this.book.book_name,img_url:this.book.book_img_url,author:this.book.book_author,catalogue_id:1,catalogue_name:this.book.catalogue_text_list[0]},localStorage.bookshelf=JSON.stringify(this.bookshelf),d({message:"\u52A0\u5165\u4E66\u67B6\u6210\u529F\uFF01",type:"success",duration:1200}))},tocontentid(e){a("html,body").animate({scrollTop:a(e).offset().top-a(window).height()/2},70),a(e).css({background:"#000000b8"}),a(e+" a").css({color:"#FFF"})}},components:{cataloguebox:K}},v=e=>(O("data-v-44e89d53"),e=e(),V(),e),q={id:"app"},G=v(()=>o("div",{class:"header"},[o("div",{class:"home"},[o("a",{href:"/book"},"Book")])],-1)),H={id:"box"},Q={class:"bookbox"},U={class:"bookimg"},W=["href"],X=["src","alt"],Y={class:"bookinfo"},$={class:"bookname"},oo=["href"],eo={class:"author"},to={class:"resume"},so={class:"bookdo"},ao=m("\u52A0\u5165\u4E66\u67B6"),io=m("\u7EE7\u7EED\u9605\u8BFB"),_o={class:"book-catalogue-list"},co={class:"catalogue_location"},lo=v(()=>o("svg",{t:"1648216386348",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"101090"},[o("path",{d:"M514.9184 931.7888a176.0256 176.0256 0 0 1-88.2688-23.6032c-159.3344-92.4672-279.5008-288.8704-279.5008-456.96 0-189.4912 150.3744-349.44 342.3232-364.1856 99.84-7.68 200.704 26.5728 276.6848 93.9008 74.3936 65.9456 117.6576 155.392 121.9072 251.904 7.936 182.016-106.2912 373.0432-284.3136 475.2896a178.5856 178.5856 0 0 1-88.832 23.6544z m2.3552-784.384c-7.68 0-15.36 0.3072-23.04 0.8704-160.1536 12.288-285.5936 145.3568-285.5936 302.9504 0 145.4592 109.312 322.816 248.8832 403.8144 35.3792 20.5312 79.6672 20.48 115.6096-0.1536 158.6176-91.136 260.5056-259.6352 253.5424-419.3792-3.4816-79.7184-39.424-153.8048-101.2736-208.5888-57.7024-51.2-132.5056-79.5136-208.128-79.5136z",fill:"#333333","p-id":"101091"}),o("path",{d:"M517.7856 456.192m-132.096 0a132.096 132.096 0 1 0 264.192 0 132.096 132.096 0 1 0-264.192 0Z",fill:"#F55C04","p-id":"101092"})],-1)),no=[lo];function ro(e,s,l,x,t,n){const h=C,w=N,y=p;return i(),b("div",{class:"back-all",style:F({background:t.backimg})},[o("div",q,[G,I(o("div",H,[o("div",Q,[o("div",U,[o("a",{href:"/book/"+t.book.book_id},[o("img",{src:t.book.book_img_url,alt:t.book.book_name},null,8,X)],8,W)]),o("div",Y,[o("div",$,[o("a",{href:"/book/"+t.book.book_id},c(t.book.book_name),9,oo)]),o("div",eo,"\u4F5C\u8005\uFF1A"+c(t.book.book_author),1),o("div",to,c(t.book.book_resume),1),o("div",so,[k(w,null,{default:u(()=>[k(h,{color:"#626aef",plain:"",size:"large","auto-insert-space":"",onClick:n.joinbookshelf},{default:u(()=>[ao]),_:1},8,["onClick"]),t.continueread_show?(i(),f(h,{key:0,color:"#626aef",plain:"",size:"large","auto-insert-space":"",onClick:s[0]||(s[0]=r=>e.$router.push("/book/"+t.book.book_id+"/"+t.continueread_catalogue_id))},{default:u(()=>[io]),_:1})):D("",!0)]),_:1})])])]),o("div",_o,[(i(!0),b(z,null,E(t.book.catalogue_text_list,(r,_)=>(i(),f(y,{key:_,id:"catalogue_"+Number(_+1),catalogue_text:r,index:_,catalogue_href:t.book.catalogue_href_list[_]},null,8,["id","catalogue_text","index","catalogue_href"]))),128))])],512),[[j,t.bookboxshow]])]),o("div",co,[o("a",{onClick:s[1]||(s[1]=r=>n.tocontentid("#catalogue_"+t.continueread_catalogue_id))},no)])],4)}var vo=g(Z,[["render",ro],["__scopeId","data-v-44e89d53"]]);export{vo as default};
