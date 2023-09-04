var d=Object.defineProperty;var l=(i,t,r)=>t in i?d(i,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):i[t]=r;var o=(i,t,r)=>(l(i,typeof t!="symbol"?t+"":t,r),r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();class c extends HTMLElement{connectedCallback(){this.innerHTML=`
    <div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-8 text-center">
            <h4 class="mb-4">Index of Pages</h4>
            <div class="d-flex justify-content-around flex-wrap">
                <div class="dark-tile">
                    <a href="./mermaid/view.html" target="_blank">
                        <i class="fas fa-code fa-icon"></i>HTML Mermaid Viewers
                    </a>
                </div>
                <div class="dark-tile">
                    <a href="./diagrams/school/education.html" target="_blank">
                        <i class="fas fa-university fa-icon"></i>AU Education System
                    </a>
                </div>
                <div class="dark-tile">
                    <a href="./diagrams/threeJS/diagram.html" target="_blank">
                        <i class="fas fa-cube fa-icon"></i>Three JS testing 
                    </a>
                </div>
                <!-- Add more tiles as needed -->
            </div>
        </div>
    </div>
</div>
      `}}o(c,"observedAttributes",[]);customElements.define("nav-menu",c);
