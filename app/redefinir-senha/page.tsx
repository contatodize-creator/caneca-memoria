"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "../../components/Nav";
import { supabase } from "../../lib/supabase";

export default function RedefinirSenha(){
 const router=useRouter();
 const [ready,setReady]=useState(false),[password,setPassword]=useState(""),[confirm,setConfirm]=useState(""),[show,setShow]=useState(false),[loading,setLoading]=useState(false),[error,setError]=useState("");
 useEffect(()=>{supabase.auth.getSession().then(({data})=>setReady(!!data.session));const{data}=supabase.auth.onAuthStateChange((event,session)=>{if(event==="PASSWORD_RECOVERY"||session)setReady(true)});return()=>data.subscription.unsubscribe()},[]);
 async function save(e:FormEvent){e.preventDefault();setError("");if(password.length<8)return setError("Use uma senha com pelo menos 8 caracteres.");if(password!==confirm)return setError("As senhas não coincidem.");setLoading(true);const{error}=await supabase.auth.updateUser({password});setLoading(false);if(error)return setError("Não foi possível alterar a senha. Solicite um novo link de recuperação.");router.replace("/painel");router.refresh()}
 return <main><Nav/><div className="authWrap"><div className="formCard"><span className="eyebrow">recuperação segura</span><h2 style={{marginTop:14}}>Crie uma nova senha</h2>{!ready?<><p className="muted">Este link não está mais válido ou ainda não foi confirmado.</p><Link className="button secondary" href="/login">Voltar ao login</Link></>:<form className="authForm" onSubmit={save}><label>Nova senha<div className="passwordField"><input type={show?"text":"password"} minLength={8} value={password} onChange={e=>setPassword(e.target.value)} autoComplete="new-password" required/><button type="button" onClick={()=>setShow(!show)}>{show?"Ocultar":"Mostrar"}</button></div></label><label>Repita a nova senha<input type={show?"text":"password"} minLength={8} value={confirm} onChange={e=>setConfirm(e.target.value)} autoComplete="new-password" required/></label><p className="small">Use uma senha exclusiva, com pelo menos 8 caracteres. Evite reutilizar a senha do seu e-mail ou de outras lojas.</p>{error&&<div className="errorBox" role="alert">{error}</div>}<button className="button" disabled={loading}>{loading?"Salvando...":"Salvar nova senha"}</button></form>}</div></div></main>
}
