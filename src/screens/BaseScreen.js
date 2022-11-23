const IPFSURL = 'https://snapalgo-imgs.netlify.app/imgs' 
const sendImg = IPFSURL+ "/send-outline.svg";
const qrImg = IPFSURL+ "/receive-outline.svg";
const logImg = IPFSURL+ "/ledger-outline.svg";
const AssetImg = IPFSURL+ "/wallet-outline.svg";
const AccountImg = IPFSURL+ "/account-outline.svg";
const SwapImg = IPFSURL+"/AlgoIconExchange.svg"

export default class BaseScreen{
    constructor(walletUI, wallet){
        this.wallet = wallet;
        this.walletUI = walletUI;
    }
    #createImgButton(img, title){
        let iconHolder = document.createElement('div');
        this.wallet.injector.inject(iconHolder, "display: flex; flex-direction: column; justify-content: center; margin-left: 5px; margin-right: 5px;");
        let button = document.createElement('button');
        //button.style =  " color:white; width:35px; height:35px; border-radius: 100%;  border: white; cursor: pointer; margin: 5px;";
        button.className = "snapAlgoWalletButton";
        this.wallet.injector.inject(button, "border: none; background: none;  ");

        let buttonImg = document.createElement('img');
        buttonImg.src = img;
        this.wallet.injector.inject(buttonImg,"width: 40px; height: 40px; cursor: pointer; background: none; margin-right: 5px;");
        let text = document.createElement('p');
        text.innerHTML = title;
        text.dataset.title = title;
        text.dataset.opacity = '0';
        text.dataset.mouseOn = false;
        this.wallet.injector.inject(text, `color:white; font-size: 10pt; text-align: center; opacity: 0; animation-fill-mode: forwards;`)
        button.appendChild(buttonImg);
        iconHolder.appendChild(button);
        iconHolder.appendChild(text);
        buttonImg.addEventListener('mouseover', (e)=>{

            let title = e.target.parentElement.parentElement.lastChild
            console.log(title);
            title.style.animation = "fadeIn 1s forwards"
            
        })
        buttonImg.addEventListener('mouseout', (e)=>{
            
            
            let title = e.target.parentElement.parentElement.lastChild;
            title.style.animation = "";
            title.style.opacity = "0";
            
        })
        return iconHolder;
    }
    
    render(){
        let walletIframe = document.createElement("iframe");
        walletIframe.src = 'http://localhost:3001/';
        walletIframe.id = 'walletIframe';
        this.wallet.injector.inject(walletIframe, "width: 396px; border: none;");
        
        return {"element":walletIframe, height:175, width:400};
  }
}