"use client";
import Link from "next/link";
import {FormEvent,Suspense,useState} from "react";
import {useRouter,useSearchParams} from "next/navigation";
import Nav from "../../components/Nav";
import {supabase} from "../../lib/supabase";

function LoginForm(){
 const router=useRouter(),params=useSearchParams();
 const[email,setEmail]=useState(""),[password,setPassword]=useState(""),[loading,setLoading]=useState(false),[message,setMessage]=useState(""),[error,setError]=useState(""),[show,setShow]=useState(false);
 const requested=params.get("next")||"/painel",next=requested.startsWith("/")&&!requested.startsWith("//")?requested:"/painel";
 async function login(e:FormEvent){e.preventDefault();setLoading(true);setError("");setMessage("");const{error}=await supabase.auth.signInWithPassword({email:email.trim(),password});setLoading(false);if(error)return setError("E-mail ou senha incorretos.");router.push(next);router.refresh()}
 async function signup(){if(!email.trim())return setError("Digite seu e-mail.");if(password.length<6)return setError("Para criar a conta, use uma senha com pelo menos 6 caracteres.");setLoading(true);setError("");setMessage("");const{data,error}=await supabase.auth.signUp({email:email.trim(),password});setLoading(false);if(error)return setError("Não foi possível criar a conta agora.");if(data.session){router.push(next);router.refresh()}else setMessage("Conta criada. Agora você já pode entrar com seu e-mail e senha.")}
 async function recover(){if(!email.trim())return setError("Digite seu e-mail para recuperar a senha.");setLoading(true);setError("");const{error}=await supabase.auth.resetPasswordForEmail(email.trim(),{redirectTo:`${window.location.origin}/redefinir-senha`});setLoading(false);if(error)return setError("Não foi possível enviar a recuperação agora.");setMessage("Enviamos as instruções de recuperação, caso exista uma conta com esse e-mail.")}
 return <div className="authWrap"><div className="formCard"><span className="eyebrow">DizeCode</span><h2 style={{marginTop:14}}>Entrar</h2><p className="muted">Acesse seus QRs e experiências.</p>
 <form className="authForm" onSubmit={login}><label>E-mail<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email" inputMode="email"/></label><label>Senha<div className="passwordField"><input type={show?"text":"password"} minLength={6} value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password"/><button type="button" onClick={()=>setShow(!show)}>{show?"Ocultar":"Mostrar"}</button></div></label>{error&&<div className="errorBox" role="alert">{error}</div>}{message&&<div className="successBox" role="status">{message}</div>}<button className="button" type="submit" disabled={loading} style={{width:"100%"}}>{loading?"Entrando...":"Entrar"}</button><button className="forgotButton" type="button" onClick={recover} disabled={loading}>Esqueci minha senha</button>
 <div style={{borderTop:"1px solid #e7e9ee",marginTop:10,paddingTop:18,textAlign:"center"}}><span className="muted">Ainda não tem conta? </span><button type="button" className="forgotButton" onClick={signup} disabled={loading} style={{display:"inline",margin:0}}>Criar conta grátis</button></div>
 <p className="legalInline">Ao continuar, você concorda com os <Link href="/termos">Termos de Uso</Link> e a <Link href="/privacidade">Política de Privacidade</Link>.</p></form></div></div>}
export default function LoginPage(){return <main><Nav/><Suspense fallback={<div className="authWrap"><div className="formCard"><p className="muted">Carregando...</p></div></div>}><LoginForm/></Suspense></main>}
