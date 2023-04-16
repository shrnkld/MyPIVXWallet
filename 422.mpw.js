var MPW;(()=>{var e,t,r,n,s={17230:(e,t,r)=>{"use strict";var n=r(48764),s=r(17748);function o(e){return n.Buffer.from(e).toString("hex")}var i=r(27760),a=r(72697);r(2153);const c=10**8,u={current:null,main:{collateralInSats:1e12,isTestnet:!1,TICKER:"PIV",PUBKEY_PREFIX:["D"],STAKING_PREFIX:"S",PUBKEY_ADDRESS:30,SECRET_KEY:212,BIP44_TYPE:119,BIP44_TYPE_LEDGER:77,PROTOCOL_VERSION:70926,MASTERNODE_PORT:51472,Explorers:[{name:"rockdev",url:"https://explorer.rockdev.org"},{name:"zkBitcoin",url:"https://zkbitcoin.com"},{name:"Duddino",url:"https://explorer.duddino.com"}],Nodes:[{name:"Duddino",url:"https://rpc.duddino.com/mainnet"}],Consensus:{UPGRADE_V6_0:void 0},budgetCycleBlocks:43200,proposalFee:5e9,maxPaymentCycles:6,maxPayment:432e11},testnet:{collateralInSats:1e12,isTestnet:!0,TICKER:"tPIV",PUBKEY_PREFIX:["x","y"],STAKING_PREFIX:"W",PUBKEY_ADDRESS:139,SECRET_KEY:239,BIP44_TYPE:1,BIP44_TYPE_LEDGER:1,PROTOCOL_VERSION:70926,MASTERNODE_PORT:51474,Explorers:[{name:"rockdev",url:"https://testnet.rockdev.org"}],Nodes:[{name:"Duddino",url:"https://rpc.duddino.com/testnet"}],Consensus:{UPGRADE_V6_0:void 0},budgetCycleBlocks:144,proposalFee:5e9,maxPaymentCycles:20,maxPayment:144e9}};u.current=u.main,r(25108),r(96192);var l=r(77191),d=r.n(l);function E(e=32){return crypto.getRandomValues(new Uint8Array(e))}function p(e,t,r){const n=e.length;if(n-r-t.length<0){const e="CRITICAL: Overflow detected ("+(n-r-t.length)+"), possible state corruption, backup and refresh advised.";throw function(e,t,r=[],n=0){const s=document.createElement("div");s.classList.add("alertpop"),s.classList.add(e),setTimeout((()=>{s.style.opacity="1",s.style.zIndex="999999",s.classList.add("bounce-ani"),s.classList.add("bounce")}),100),"number"==typeof r&&(n=r,r=[]);const o=function(e,t){return t.forEach((t=>{e=e.replaceAll("{"+Object.keys(t)[0]+"}",Object.values(t)[0])})),e}(t,r);s.innerHTML=o,s.destroy=()=>{clearTimeout(s.timer),s.style.opacity="0",setTimeout((()=>{s.remove()}),600)},s.addEventListener("click",s.destroy),n>0&&(s.timer=setTimeout(s.destroy,n)),R.domAlertPos.appendChild(s)}("warning",e,5e3),Error(e)}let s=0;for(;r<n;)e[r++]=t[s++]}r(27715),r(19755);const O=new(r(17187).EventEmitter);class h{cData={};strName="";strEndpoint="";async ensureCacheExists(){this.cData&&Object.keys(this.cData).length||await this.fetch()}async fetch(){return this.cData=await(await fetch(this.strEndpoint)).json()}}let T="usd",f=new class extends h{constructor(){super(),this.strName="CoinGecko",this.strEndpoint="https://api.coingecko.com/api/v3/coins/pivx?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"}async getPrice(e){return await this.ensureCacheExists(),this.cData.market_data.current_price[e]}async getCurrencies(){return await this.ensureCacheExists(),Object.keys(this.cData.market_data.current_price)}},m=(u.current.Explorers[0],u.current.Nodes[0],{hit:"A ping indicating an app load, no unique data is sent.",time_to_sync:"The time in seconds it took for MPW to last synchronise.",transaction:"A ping indicating a Tx, no unique data is sent, but may be inferred from on-chain time."});Object.keys(m);r(25108);var g=r(25108);class v{constructor({id:e,path:t,sats:r,script:n,vout:s,height:o,status:i,isDelegate:a=!1,isReward:c=!1}={}){this.id=e,this.path=t,this.sats=r,this.script=n,this.vout=s,this.height=o,this.status=i,this.isDelegate=a,this.isReward=c}equalsUTXO(e){return this.id===e.id&&this.vout===e.vout&&this.status===e.status}}class y{constructor(){this.UTXOs=[],this.subscribeToNetwork()}static CONFIRMED=0;static REMOVED=1;static PENDING=2;async removeWithDelay(e,t){var r;await(r=60*e*1e3,new Promise(((e,t)=>setTimeout(e,r)))),this.removeUTXO(t)}isAlreadyStored({id:e,vout:t,status:r}){return this.UTXOs.some((n=>n.id===e&&n.vout===t&&(!r||n.status===r)))}getUTXOsByState(e){return this.UTXOs.filter((t=>t.status===e))}removeFromState(e,t){const r=this.getUTXOsByState(t);for(const t of r)if(t.id===e.id&&t.vout===e.vout){this.removeUTXO(t);break}}addUTXO({id:e,path:t,sats:r,script:n,vout:s,height:o,status:i,isDelegate:a,isReward:c}){const u=new v({id:e,path:t,sats:r,script:n,vout:s,height:o,status:i,isDelegate:a,isReward:c});this.isAlreadyStored({id:e,vout:s})?this.updateUTXO({id:e,vout:s}):this.UTXOs.push(u),P(!0),D(!0)}updateUTXO({id:e,vout:t}){const r=this.UTXOs.find((r=>r.id===e&&r.vout==t));r.status===y.PENDING&&(r.status=y.CONFIRMED),P(!0),D(!0)}removeUTXO(e){this.UTXOs=this.UTXOs.filter((t=>!t.equalsUTXO(e)))}autoRemoveUTXO({id:e,vout:t}){for(const r of this.UTXOs)if(r.id===e&&r.vout===t)return r.status=y.REMOVED,void this.removeWithDelay(12,r);g.error("Mempool: Failed to find UTXO "+e+" ("+t+") for auto-removal!")}autoRemoveUTXOs(e){for(const t of e)for(const e of this.UTXOs)if(e.equalsUTXO(t)){e.status=y.REMOVED,this.removeWithDelay(12,e);break}}getConfirmed(){return this.getUTXOsByState(y.CONFIRMED)}getStandardUTXOs(){return this.UTXOs.filter((e=>e.status!==y.REMOVED&&!e.isDelegate))}getDelegatedUTXOs(){return this.UTXOs.filter((e=>e.status!==y.REMOVED&&e.isDelegate))}getBalance(){return this.getStandardUTXOs().filter((e=>!function(e,t=null){const r=t||JSON.parse(localStorage.getItem("masternode")||"{}");if(r&&r.collateralTxId){const{collateralTxId:t,outidx:n}=r;return t===e.id&&e.vout===n}return!1}(e))).reduce(((e,t)=>e+t.sats),0)}static isValidUTXO(e){return!e.isReward||null.cachedBlockCount-e.height>100}getDelegatedBalance(){return this.getDelegatedUTXOs().reduce(((e,t)=>e+t.sats),0)}subscribeToNetwork(){O.on("utxo",(async e=>{for(const t of e)this.isAlreadyStored({id:t.txid,vout:t.vout})?this.updateUTXO({id:t.txid,vout:t.vout}):this.addUTXO(await null.getUTXOFullInfo(t))}))}}r(91555);Object.freeze({0:0,FALSE:0,PUSHDATA1:76,PUSHDATA2:77,PUSHDATA4:78,"1NEGATE":79,RESERVED:80,1:81,TRUE:81,2:82,3:83,4:84,5:85,6:86,7:87,8:88,9:89,10:90,11:91,12:92,13:93,14:94,15:95,16:96,NOP:97,VER:98,IF:99,NOTIF:100,VERIF:101,VERNOTIF:102,ELSE:103,ENDIF:104,VERIFY:105,RETURN:106,TOALTSTACK:107,FROMALTSTACK:108,"2DROP":109,"2DUP":110,"3DUP":111,"2OVER":112,"2ROT":113,"2SWAP":114,IFDUP:115,DEPTH:116,DROP:117,DUP:118,NIP:119,OVER:120,PICK:121,ROLL:122,ROT:123,SWAP:124,TUCK:125,CAT:126,SUBSTR:127,LEFT:128,RIGHT:129,SIZE:130,INVERT:131,AND:132,OR:133,XOR:134,EQUAL:135,EQUALVERIFY:136,RESERVED1:137,RESERVED2:138,"1ADD":139,"1SUB":140,"2MUL":141,"2DIV":142,NEGATE:143,ABS:144,NOT:145,"0NOTEQUAL":146,ADD:147,SUB:148,MUL:149,DIV:150,MOD:151,LSHIFT:152,RSHIFT:153,BOOLAND:154,BOOLOR:155,NUMEQUAL:156,NUMEQUALVERIFY:157,NUMNOTEQUAL:158,LESSTHAN:159,GREATERTHAN:160,LESSTHANOREQUAL:161,GREATERTHANOREQUAL:162,MIN:163,MAX:164,WITHIN:165,RIPEMD160:166,SHA1:167,SHA256:168,HASH160:169,HASH256:170,CODESEPARATOR:171,CHECKSIG:172,CHECKSIGVERIFY:173,CHECKMULTISIG:174,CHECKMULTISIGVERIFY:175,NOP1:176,NOP2:177,CHECKLOCKTIMEVERIFY:177,NOP3:178,NOP4:179,NOP5:180,NOP6:181,NOP7:182,NOP8:183,NOP9:184,NOP10:185,ZEROCOINMINT:193,ZEROCOINSPEND:194,ZEROCOINPUBLICSPEND:195,CHECKCOLDSTAKEVERIFY_LOF:209,CHECKCOLDSTAKEVERIFY:210,INVALIDOPCODE:255}),r(25108),r(9424),r(51409),r(25108),r(25108),new TextEncoder,new TextDecoder,r(3006),r(19755),r(25108);let R={};const S=new y;function P(e=!1){const t=S.getBalance(),r=t/c;if(e){const e=r.toFixed(2).length;R.domGuiBalance.innerText=r.toFixed(e>=6?0:2),R.domAvailToDelegate.innerText="Available: ~"+r.toFixed(2)+" "+u.current.TICKER,f.getPrice(T).then((e=>{const t=Intl.supportedValuesOf("currency").includes(T.toUpperCase())?{style:"currency",currency:T,currencyDisplay:"narrowSymbol"}:{maximumFractionDigits:8,minimumFractionDigits:8};let n=r*e;R.domGuiBalanceValue.innerText=n.toLocaleString("en-gb",t),R.domGuiBalanceValueCurrency.innerText=T.toUpperCase(),R.domSendAmountValueCurrency.innerText=T.toUpperCase(),R.domSendAmountCoinsTicker.innerText=u.current.TICKER}))}return t}function D(e=!1){const t=S.getDelegatedBalance();return e&&(R.domGuiBalanceStaking.innerText=Math.floor(t/c),R.domGuiBalanceBoxStaking.style.fontSize=Math.floor(t/c).toString().length>=4?"large":"x-large",R.domAvailToUndelegate.innerText="Staking: ~"+(t/c).toFixed(2)+" "+u.current.TICKER),t}function U({pkBytes:e,publicKey:t,output:r="ENCODED"}){if(!e&&!t)return null;const c="UNCOMPRESSED_HEX"!==r;let l=t?(E=t,n.Buffer.from(E,"hex")):i.$3(e,c);var E;if("UNCOMPRESSED_HEX"===r){if(65!==l.length)throw new Error("Can't uncompress an already compressed key");return o(l)}if(65===l.length&&(l=function(e){if(65!=e.length)throw new Error("Attempting to compress an invalid uncompressed key");const t=e.slice(1,33);return[e.slice(33)[31]%2==0?2:3,...t]}(l)),33!=l.length)throw new Error("Invalid public key");if("COMPRESSED_HEX"===r)return o(l);const O=(0,s.J)(new Uint8Array(l)),h=(0,a.b)(O),T=new Uint8Array(21);var f;T[0]=u.current.PUBKEY_ADDRESS,p(T,h,1);const m=(f=T,(0,s.J)((0,s.J)(new Uint8Array(f)))).slice(0,4),g=new Uint8Array(25);return p(g,T,0),p(g,m,21),d().encode(g)}r(49840),r(2099),r(27578),r(34611),r(19755),r(25108),new Map([[25870,"Open the PIVX app on your device"],[25873,"Open the PIVX app on your device"],[57408,"Navigate to the PIVX app on your device"],[27157,"Wrong app! Open the PIVX app on your device"],[27266,"Wrong app! Open the PIVX app on your device"],[27904,"Wrong app! Open the PIVX app on your device"],[27010,"Unlock your Ledger, then try again!"],[27404,"Unlock your Ledger, then try again!"]]),onmessage=function(e){for(;;){const e={};e.priv=E(),e.pub=U({pkBytes:e.priv}),postMessage(e)}}},95856:()=>{},46601:()=>{},89214:()=>{},52361:()=>{},94616:()=>{}},o={};function i(e){var t=o[e];if(void 0!==t)return t.exports;var r=o[e]={id:e,loaded:!1,exports:{}};return s[e].call(r.exports,r,r.exports,i),r.loaded=!0,r.exports}i.m=s,i.x=()=>{var e=i.O(void 0,[219],(()=>i(17230)));return i.O(e)},e=[],i.O=(t,r,n,s)=>{if(!r){var o=1/0;for(l=0;l<e.length;l++){for(var[r,n,s]=e[l],a=!0,c=0;c<r.length;c++)(!1&s||o>=s)&&Object.keys(i.O).every((e=>i.O[e](r[c])))?r.splice(c--,1):(a=!1,s<o&&(o=s));if(a){e.splice(l--,1);var u=n();void 0!==u&&(t=u)}}return t}s=s||0;for(var l=e.length;l>0&&e[l-1][2]>s;l--)e[l]=e[l-1];e[l]=[r,n,s]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},r=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,i.t=function(e,n){if(1&n&&(e=this(e)),8&n)return e;if("object"==typeof e&&e){if(4&n&&e.__esModule)return e;if(16&n&&"function"==typeof e.then)return e}var s=Object.create(null);i.r(s);var o={};t=t||[null,r({}),r([]),r(r)];for(var a=2&n&&e;"object"==typeof a&&!~t.indexOf(a);a=r(a))Object.getOwnPropertyNames(a).forEach((t=>o[t]=()=>e[t]));return o.default=()=>e,i.d(s,o),s},i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((t,r)=>(i.f[r](e,t),t)),[])),i.u=e=>"./"+e+".mpw.js",i.miniCssF=e=>{},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e;i.g.importScripts&&(e=i.g.location+"");var t=i.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=e})(),(()=>{i.b=self.location+"";var e={422:1};i.f.i=(t,r)=>{e[t]||importScripts(i.p+i.u(t))};var t=self.webpackChunkMPW=self.webpackChunkMPW||[],r=t.push.bind(t);t.push=t=>{var[n,s,o]=t;for(var a in s)i.o(s,a)&&(i.m[a]=s[a]);for(o&&o(i);n.length;)e[n.pop()]=1;r(t)}})(),n=i.x,i.x=()=>i.e(219).then(n);var a=i.x();MPW=a})();
//# sourceMappingURL=422.mpw.js.map