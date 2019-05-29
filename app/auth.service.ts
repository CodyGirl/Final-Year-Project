  import { Injectable, EventEmitter } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { shareReplay } from 'rxjs/operators';
  import { Subscription } from 'rxjs/internal/Subscription';

  export interface twitterId {
    id: string;
  }
  export interface UserToken {
    token: string;
  }
  export interface UserInfo {
    _id: string,
    uname: string,
    email: string,
    twitterID: string,
    gender: string,
    age: string,
    psw: string
  }

  // const CACHE_SIZE = 1;

  @Injectable({ providedIn: 'root' })
  export class AuthService {
    invokePopupComponentFunction = new EventEmitter();

    subsVar: Subscription;
    constructor(private http: HttpClient) { }

    private cacheMovies: any;
    private cacheMusic: any;
    private cacheJob: any;
    private cacheBooks: any;
    private cacheDelineate: any;

    public Movies(token: UserToken) {
      if (!this.cacheMovies) {
        this.cacheMovies = this.defaultDataMovie(token).pipe(
          // shareReplay(CACHE_SIZE)
          shareReplay()
        );
      }
      return this.cacheMovies;
    }
    onPopup() {
      this.invokePopupComponentFunction.emit();
    }

    public postMovieTwitterID(user: twitterId): Observable<any> {
      const base = this.http.post('http://192.168.1.6:5000/movieRecommendations', user)
      const request = base.pipe(
        map((data: any) => {
          return data
        })
      )
      return request
    }
    public defaultDataMovie(token: UserToken): Observable<any> {
      const base = this.http.post('http://192.168.1.6:5000/defaultDataMovie', token)
      const request = base.pipe(
        map((data: any) => {
          return data;
        })
      )
      return request;
    }

    public Music(token: UserToken) {
      if (!this.cacheMusic) {
        this.cacheMusic = this.defaultDataMusic(token).pipe(
          shareReplay()
        );
      }
      return this.cacheMusic;
    }
    public postMusicTwitterID(user: twitterId): Observable<any> {
      const base = this.http.post('http://192.168.1.6:5000/musicRecommendations', user);
      const request = base.pipe(
        map((data: any) => {
          return data;
        })
      );
      return request;
    }
    public defaultDataMusic(token: UserToken): Observable<any> {
      const base = this.http.post('http://192.168.1.6:5000/defaultDataMusic', token);
      const request = base.pipe(
        map((data: any) => {
          return data;
        })
      );
      return request;
    }

    public Job(token: UserToken) {
      if (!this.cacheJob) {
        this.cacheJob = this.defaultDataJob(token).pipe(
          shareReplay()
        );
      }
      return this.cacheJob;
    }
    public postJobTwitterID(user: twitterId): Observable<any> {
      const base = this.http.post('http://192.168.1.6:5000/jobRecommendations', user);
      const request = base.pipe(
        map((data: any) => {
          return data;
        })
      )
      return request;
    }
    public defaultDataJob(token: UserToken): Observable<any> {
      const base = this.http.post('http://192.168.1.6:5000/defaultDataJob', token);
      const request = base.pipe(
        map((data: any) => {
          return data;
        })
      )
      return request;
    }

    public Books(token: UserToken) {
      if (!this.cacheBooks) {
        this.cacheBooks = this.defaultDataBook(token).pipe(
          shareReplay()
        );
      }
      return this.cacheBooks;
    }
    public postBookTwitterID(user: twitterId): Observable<any> {
      const base = this.http.post('http://192.168.1.6:5000/bookRecommendations', user);
      const request = base.pipe(
        map((data: any) => {
          return data
        })
      )
      return request
    }
    public defaultDataBook(token: UserToken): Observable<any> {
      const base = this.http.post('http://192.168.1.6:5000/defaultDataBook', token)
      const request = base.pipe(
        map((data: any) => {
          return data
        })
      )
      return request
    }

    public Delineate(token: UserToken) {
      if (!this.cacheDelineate) {
        this.cacheDelineate = this.defaultDataDelineate(token).pipe(
          shareReplay()
        );
      }
      return this.cacheDelineate;
    }
    public postDelineateTwitterID(user: twitterId): Observable<any> {
      const base = this.http.post('http://192.168.1.6:5000/personalityDelineate', user)
      const request = base.pipe(
        map((data: any) => {
          return data
        })
      )
      return request
    }
    public defaultDataDelineate(token: UserToken): Observable<any> {
      const base = this.http.post('http://192.168.1.6:5000/defaultDataDelineate', token);
      const request = base.pipe(
        map((data: any) => {
          return data
        })
      )
      return request
    }
    public register(user: UserInfo): Observable<any> {
      const base = this.http.post('http://192.168.1.6:5000/register', user);
      const request = base.pipe(
        map((data: any) => {
          return data
        })
      )
      return request
    }

    public login(user: UserInfo): Observable<any> {
      const base = this.http.post('http://192.168.1.6:5000/login', user);
      const request = base.pipe(
        map((data: any) => {
          return data
        })
      )
      return request
    }
    sendToken(token: string) {
      localStorage.setItem('LoggedInUser', token);
    }
    getToken() {
      return localStorage.getItem('LoggedInUser');
    }
    isLoggednIn() {
      return this.getToken() !== null;
    }
    logout() {
      this.cacheMovies = null;
      this.cacheMusic = null;
      this.cacheBooks = null;
      this.cacheJob = null;
      this.cacheDelineate = null;
      localStorage.removeItem('LoggedInUser');
    }
  }
