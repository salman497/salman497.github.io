import { Injectable, inject } from '@angular/core';
import { 
  Auth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect, 
  signOut, 
  user 
} from '@angular/fire/auth';
import { 
  Firestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  deleteDoc 
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, from, map, of } from 'rxjs';
import { LoginUser } from './revealjs/state/state';
import { MarkdownDB } from './revealjs/models/db.model';
import { generateRandomId } from './revealjs/utils/basic-utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private currentUserSubject = new BehaviorSubject<LoginUser>({});

  user$ = user(this.auth);
  getLoginUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.auth.onAuthStateChanged((user) => {
      console.log('onAuthStateChanged', user);
      if (user) {
        const loginUser: LoginUser = {
          id: user.uid,
          name: user.displayName || '',
          imageUrl: user.photoURL || ''
        };
        this.currentUserSubject.next(loginUser);
      } else {
        this.currentUserSubject.next({});
      }
    });
  }

  async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(this.auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  saveEditor(data: MarkdownDB): Observable<MarkdownDB> {
    if (!data.id) {
      data.id = generateRandomId();
    }

    const docRef = doc(this.firestore, 'markdown', data.id.toString());
    return from(setDoc(docRef, data, { merge: true })).pipe(
      map(() => data)
    );
  }

  getEditor$(id: number): Observable<MarkdownDB> {
    const docRef = doc(this.firestore, 'markdown', id.toString());
    return from(getDoc(docRef)).pipe(
      map(doc => {
        if (!doc.exists()) return {};
        return { id: doc.id, ...doc.data() } as MarkdownDB;
      })
    );
  }

  getAllUserEditors$(userId: string): Observable<MarkdownDB[]> {
    const markdownRef = collection(this.firestore, 'markdown');
    const q = query(markdownRef, where('user_id', '==', userId));

    return from(getDocs(q)).pipe(
      map(snapshot => 
        snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        } as MarkdownDB))
      )
    );
  }

  async deleteMarkdown(markdownId: any): Promise<void> {
    try {
      const docRef = doc(this.firestore, 'markdown', markdownId.toString());
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }
}