'use strict';

import { select, listen, getElement, selectAll, create } from './utils.js';


/*----------------------------------- */
/*------------------DOM-------------- */
/*----------------------------------- */

const acceptBtn = select('.accept');
const settingsBtn = select('.settings');
const cookiesBox = select('.first');
const settingsBox = select('.second'); 
const browserCookies  = selectAll('.cookie');
const saveBtn = select('.save-button');
const main = select('.main');
const {log} = console;
const blur = select('.blur')

/*----------------------------------- */
/*--------------server-info---------- */
/*----------------------------------- */
let operatingSystem;
let browser;
let screenWidth;
let screenHeight;


function windowHeight() {
    screenHeight  = window.innerHeight;
}


function windowWidth() {
    screenWidth = window.innerWidth;
}


function operatingSystemType(){
    const operatingSystems =['Linux','Windows','Mac'];
    operatingSystems.forEach(element => {
        if(navigator.userAgent.includes(element)){
            operatingSystem=element;
        }
    });
}


function BrowserType(){
    const browsers=['Chrome','Firefox', 'Microsoft Edge', 'Opera'];
    browsers.forEach(element => {
        if(navigator.userAgent.includes(element)){
            browser=element;
        }
    });
}

/*------------------------------------------- */
/*--------------set and get cookies---------- */
/*------------------------------------------- */
function setCookie(key,value){
    document.cookie=`${key}=${value}; max-age=15`;
}


function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


/*------------------------------------------- */
/*--------------------Dialogs---------------- */
/*------------------------------------------- */
function hideCookieDialog(){
    cookiesBox.classList.add('hidden');
    cookiesBox.classList.remove('visible');
    main.classList.remove('opacity-visible')
}


function showCookiesDialog(){
    cookiesBox.classList.remove('hidden');
    cookiesBox.classList.add('visible');
    main.classList.add('opacity-visible');
    blur.classList.add('isvisible');
}


function hideSettingsDialog(){
    settingsBox.classList.add('hidden');
    settingsBox.classList.remove('visible');
    main.classList.remove('opacity-visible')
}


function getAllCookiesValues() {
    operatingSystemType();
    windowHeight();
    windowWidth();
    BrowserType();
    setCookie('OS',operatingSystem);
    setCookie('Browser',browser);
    setCookie('Width',screenWidth);
    setCookie('Height',screenHeight);
    hideCookieDialog();
    log('Cookies saved successfully');
}


function getCookiesToSet() {
    browserCookies.forEach(cookie => {
        if(cookie.checked == true){
           setSpecificCookie(cookie.value);
        }
    });
    log('Cookies saved successfully');
    hideSettingsDialog();
}


function setSpecificCookie(cookie) {
    switch(cookie){
        case 'browser':
            BrowserType();
            setCookie('Browser',browser);
            break;
        case 'os':
            operatingSystemType();
            setCookie('OS',operatingSystem);
            break;
        case 'width':
            windowWidth();
            setCookie('Width',screenWidth);
            break;
        default:
            windowHeight();
            setCookie('Height',screenHeight);
    }
}


function printCookies(){
    selectAllCookies();
    log(getCookie('Browser') ? `Browser: ${getCookie('Browser')}` : 'Browser: rejected');
    log(getCookie('OS') ? `Operating system: ${getCookie('OS')}` : 'OS: rejected');
    log(getCookie('Width') ? `Width: ${getCookie('Width')}` : 'Width: rejected' );
    log(getCookie('Height') ? `Height: ${getCookie('Height')}` : 'Height: rejected' );
}


function checkCookies(){
    document.cookie ? printCookies() :setTimeout(showCookiesDialog, 2000);
}


function setPage() {
    selectAllCookies();
}


function selectAllCookies(){
    browserCookies.forEach(cookie => {
    cookie.checked=true;
    });
}


function hideSettingDialog() {
    cookiesBox.classList.add('hidden');
    settingsBox.classList.remove('hidden');
}


listen('load',window,checkCookies);
listen('click',saveBtn,getCookiesToSet);
listen('click',acceptBtn,getAllCookiesValues);
listen('click',settingsBtn,hideSettingDialog);


