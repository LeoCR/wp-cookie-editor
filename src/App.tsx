import React,{useEffect, useState} from 'react';
import { useTranslation} from "react-i18next";
import {CookiesDialogs} from './components/Dialog'
import './App.css';

const App=()=> {
  const [isCookieEditorOpen,setIsCookieEditorOpen]=React.useState<boolean>(false)
  
  const {t} = useTranslation('common');
  const [siteOwner,setSiteOwner] = useState<string|undefined>("Leonardo Aranibar");
  useEffect(()=>{
    const wrapper=document.querySelector('.wp-cookie-policy-settings')
    const newSiteOwner=wrapper?.getAttribute('data-site-owner')?.toString();
    setSiteOwner(newSiteOwner);
  },[])
  const openCookieEditor=()=>{
    setIsCookieEditorOpen((prev)=>!prev)
  }
  const closeDialog=()=>{
    setIsCookieEditorOpen(false)
  }
  const siteURL=t('cookies_policy.privacy_policy_url');
  
  return (
    <>
    <CookiesDialogs open={isCookieEditorOpen}/>
    <div className="wp-cookie-msg-container">
      <p className='wp-txt-cookie-msg'>
      {t('cookies_policy.message', {siteOwner})} 
      {t('cookies_policy.privacy_policy_msg')}
      <a href={siteURL} target={'_blank'} rel="noreferrer" className='btn'> {t('cookies_policy.privacy_policy')} </a> o <span onClick={openCookieEditor}  className='btn'> {t('cookies_policy.editor')}</span> 
      <span onClick={closeDialog} className={'okBtn'}>OK</span>
      </p>
    </div>
    </>
    
  );
}

export default App;
