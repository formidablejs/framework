export = AuthService;
declare class AuthService {
    /**
    @param {Function} callback
    */
    static beforeLogin(callback: Function): {
        new (): import("./AuthService");
        beforeLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeLogout(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeVerify(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeResend(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        onForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        onReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onAuthenticated(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegistered(callback: Function): any;
        /**
        @param {Function} callback
        */
        onVerification(callback: Function): any;
        /**
        @param {Function} callback
        */
        onEmailResend(callback: Function): any;
        /**
        @param {Mailable} mailer
        */
        verificationMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Mailable} mailer
        */
        resetPasswordMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Object} config
        */
        routes(config?: any): {
            new (): Route;
            addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
            delete(path: string, action: Function | [Function, string]): any;
            get(path: string, action: Function | [Function, string]): any;
            options(path: string, action: Function | [Function, string]): any;
            patch(path: string, action: Function | [Function, string]): any;
            post(path: string, action: Function | [Function, string]): any;
            /**
            @param {Function} callback
            */
            put(path: string, action: Function | [Function, string]): any;
            name(name: string): any; /**
            @param {Function} callback
            */
            middleware(name: string | string[]): any;
            group(options: Object, callable: Function): void;
            all(): any[];
        };
    };
    /**
    @param {Function} callback
    */
    static beforeLogout(callback: Function): {
        new (): import("./AuthService");
        /**
        @param {Function} callback
        */
        beforeLogin(callback: Function): any;
        beforeLogout(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeVerify(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeResend(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        onForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        onReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onAuthenticated(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegistered(callback: Function): any;
        /**
        @param {Function} callback
        */
        onVerification(callback: Function): any;
        /**
        @param {Function} callback
        */
        onEmailResend(callback: Function): any;
        /**
        @param {Mailable} mailer
        */
        verificationMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Mailable} mailer
        */
        resetPasswordMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Object} config
        */
        routes(config?: any): {
            new (): Route;
            addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
            delete(path: string, action: Function | [Function, string]): any;
            get(path: string, action: Function | [Function, string]): any;
            options(path: string, action: Function | [Function, string]): any;
            patch(path: string, action: Function | [Function, string]): any;
            post(path: string, action: Function | [Function, string]): any;
            /**
            @param {Function} callback
            */
            put(path: string, action: Function | [Function, string]): any;
            name(name: string): any; /**
            @param {Function} callback
            */
            middleware(name: string | string[]): any;
            group(options: Object, callable: Function): void;
            all(): any[];
        };
    };
    /**
    @param {Function} callback
    */
    static beforeRegister(callback: Function): {
        new (): import("./AuthService");
        /**
        @param {Function} callback
        */
        beforeLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeLogout(callback: Function): any;
        beforeRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeVerify(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeResend(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        onForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        onReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onAuthenticated(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegistered(callback: Function): any;
        /**
        @param {Function} callback
        */
        onVerification(callback: Function): any;
        /**
        @param {Function} callback
        */
        onEmailResend(callback: Function): any;
        /**
        @param {Mailable} mailer
        */
        verificationMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Mailable} mailer
        */
        resetPasswordMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Object} config
        */
        routes(config?: any): {
            new (): Route;
            addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
            delete(path: string, action: Function | [Function, string]): any;
            get(path: string, action: Function | [Function, string]): any;
            options(path: string, action: Function | [Function, string]): any;
            patch(path: string, action: Function | [Function, string]): any;
            post(path: string, action: Function | [Function, string]): any;
            /**
            @param {Function} callback
            */
            put(path: string, action: Function | [Function, string]): any;
            name(name: string): any; /**
            @param {Function} callback
            */
            middleware(name: string | string[]): any;
            group(options: Object, callable: Function): void;
            all(): any[];
        };
    };
    /**
    @param {Function} callback
    */
    static beforeVerify(callback: Function): {
        new (): import("./AuthService");
        /**
        @param {Function} callback
        */
        beforeLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeLogout(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeRegister(callback: Function): any;
        beforeVerify(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeResend(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        onForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        onReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onAuthenticated(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegistered(callback: Function): any;
        /**
        @param {Function} callback
        */
        onVerification(callback: Function): any;
        /**
        @param {Function} callback
        */
        onEmailResend(callback: Function): any;
        /**
        @param {Mailable} mailer
        */
        verificationMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Mailable} mailer
        */
        resetPasswordMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Object} config
        */
        routes(config?: any): {
            new (): Route;
            addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
            delete(path: string, action: Function | [Function, string]): any;
            get(path: string, action: Function | [Function, string]): any;
            options(path: string, action: Function | [Function, string]): any;
            patch(path: string, action: Function | [Function, string]): any;
            post(path: string, action: Function | [Function, string]): any;
            /**
            @param {Function} callback
            */
            put(path: string, action: Function | [Function, string]): any;
            name(name: string): any; /**
            @param {Function} callback
            */
            middleware(name: string | string[]): any;
            group(options: Object, callable: Function): void;
            all(): any[];
        };
    };
    /**
    @param {Function} callback
    */
    static beforeResend(callback: Function): {
        new (): import("./AuthService");
        /**
        @param {Function} callback
        */
        beforeLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeLogout(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeVerify(callback: Function): any;
        beforeResend(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        onForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        onReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onAuthenticated(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegistered(callback: Function): any;
        /**
        @param {Function} callback
        */
        onVerification(callback: Function): any;
        /**
        @param {Function} callback
        */
        onEmailResend(callback: Function): any;
        /**
        @param {Mailable} mailer
        */
        verificationMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Mailable} mailer
        */
        resetPasswordMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Object} config
        */
        routes(config?: any): {
            new (): Route;
            addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
            delete(path: string, action: Function | [Function, string]): any;
            get(path: string, action: Function | [Function, string]): any;
            options(path: string, action: Function | [Function, string]): any;
            patch(path: string, action: Function | [Function, string]): any;
            post(path: string, action: Function | [Function, string]): any;
            /**
            @param {Function} callback
            */
            put(path: string, action: Function | [Function, string]): any;
            name(name: string): any; /**
            @param {Function} callback
            */
            middleware(name: string | string[]): any;
            group(options: Object, callable: Function): void;
            all(): any[];
        };
    };
    /**
    @param {Function} callback
    */
    static beforeForgot(callback: Function): {
        new (): import("./AuthService");
        /**
        @param {Function} callback
        */
        beforeLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeLogout(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeVerify(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeResend(callback: Function): any;
        beforeForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        onForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        onReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onAuthenticated(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegistered(callback: Function): any;
        /**
        @param {Function} callback
        */
        onVerification(callback: Function): any;
        /**
        @param {Function} callback
        */
        onEmailResend(callback: Function): any;
        /**
        @param {Mailable} mailer
        */
        verificationMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Mailable} mailer
        */
        resetPasswordMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Object} config
        */
        routes(config?: any): {
            new (): Route;
            addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
            delete(path: string, action: Function | [Function, string]): any;
            get(path: string, action: Function | [Function, string]): any;
            options(path: string, action: Function | [Function, string]): any;
            patch(path: string, action: Function | [Function, string]): any;
            post(path: string, action: Function | [Function, string]): any;
            /**
            @param {Function} callback
            */
            put(path: string, action: Function | [Function, string]): any;
            name(name: string): any; /**
            @param {Function} callback
            */
            middleware(name: string | string[]): any;
            group(options: Object, callable: Function): void;
            all(): any[];
        };
    };
    /**
    @param {Function} callback
    */
    static beforeReset(callback: Function): {
        new (): import("./AuthService");
        /**
        @param {Function} callback
        */
        beforeLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeLogout(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeVerify(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeResend(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeForgot(callback: Function): any;
        beforeReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        onForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        onReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onAuthenticated(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegistered(callback: Function): any;
        /**
        @param {Function} callback
        */
        onVerification(callback: Function): any;
        /**
        @param {Function} callback
        */
        onEmailResend(callback: Function): any;
        /**
        @param {Mailable} mailer
        */
        verificationMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Mailable} mailer
        */
        resetPasswordMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Object} config
        */
        routes(config?: any): {
            new (): Route;
            addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
            delete(path: string, action: Function | [Function, string]): any;
            get(path: string, action: Function | [Function, string]): any;
            options(path: string, action: Function | [Function, string]): any;
            patch(path: string, action: Function | [Function, string]): any;
            post(path: string, action: Function | [Function, string]): any;
            /**
            @param {Function} callback
            */
            put(path: string, action: Function | [Function, string]): any;
            name(name: string): any; /**
            @param {Function} callback
            */
            middleware(name: string | string[]): any;
            group(options: Object, callable: Function): void;
            all(): any[];
        };
    };
    /**
    @param {Function} callback
    */
    static onLogin(callback: Function): {
        new (): import("./AuthService");
        /**
        @param {Function} callback
        */
        beforeLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeLogout(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeVerify(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeResend(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeReset(callback: Function): any;
        onLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        onForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        onReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onAuthenticated(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegistered(callback: Function): any;
        /**
        @param {Function} callback
        */
        onVerification(callback: Function): any;
        /**
        @param {Function} callback
        */
        onEmailResend(callback: Function): any;
        /**
        @param {Mailable} mailer
        */
        verificationMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Mailable} mailer
        */
        resetPasswordMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Object} config
        */
        routes(config?: any): {
            new (): Route;
            addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
            delete(path: string, action: Function | [Function, string]): any;
            get(path: string, action: Function | [Function, string]): any;
            options(path: string, action: Function | [Function, string]): any;
            patch(path: string, action: Function | [Function, string]): any;
            post(path: string, action: Function | [Function, string]): any;
            /**
            @param {Function} callback
            */
            put(path: string, action: Function | [Function, string]): any;
            name(name: string): any; /**
            @param {Function} callback
            */
            middleware(name: string | string[]): any;
            group(options: Object, callable: Function): void;
            all(): any[];
        };
    };
    /**
    @param {Function} callback
    */
    static onRegister(callback: Function): {
        new (): import("./AuthService");
        /**
        @param {Function} callback
        */
        beforeLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeLogout(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeVerify(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeResend(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onLogin(callback: Function): any;
        onRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        onForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        onReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onAuthenticated(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegistered(callback: Function): any;
        /**
        @param {Function} callback
        */
        onVerification(callback: Function): any;
        /**
        @param {Function} callback
        */
        onEmailResend(callback: Function): any;
        /**
        @param {Mailable} mailer
        */
        verificationMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Mailable} mailer
        */
        resetPasswordMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Object} config
        */
        routes(config?: any): {
            new (): Route;
            addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
            delete(path: string, action: Function | [Function, string]): any;
            get(path: string, action: Function | [Function, string]): any;
            options(path: string, action: Function | [Function, string]): any;
            patch(path: string, action: Function | [Function, string]): any;
            post(path: string, action: Function | [Function, string]): any;
            /**
            @param {Function} callback
            */
            put(path: string, action: Function | [Function, string]): any;
            name(name: string): any; /**
            @param {Function} callback
            */
            middleware(name: string | string[]): any;
            group(options: Object, callable: Function): void;
            all(): any[];
        };
    };
    /**
    @param {Function} callback
    */
    static onForgot(callback: Function): {
        new (): import("./AuthService");
        /**
        @param {Function} callback
        */
        beforeLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeLogout(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeVerify(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeResend(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegister(callback: Function): any;
        onForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        onReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onAuthenticated(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegistered(callback: Function): any;
        /**
        @param {Function} callback
        */
        onVerification(callback: Function): any;
        /**
        @param {Function} callback
        */
        onEmailResend(callback: Function): any;
        /**
        @param {Mailable} mailer
        */
        verificationMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Mailable} mailer
        */
        resetPasswordMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Object} config
        */
        routes(config?: any): {
            new (): Route;
            addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
            delete(path: string, action: Function | [Function, string]): any;
            get(path: string, action: Function | [Function, string]): any;
            options(path: string, action: Function | [Function, string]): any;
            patch(path: string, action: Function | [Function, string]): any;
            post(path: string, action: Function | [Function, string]): any;
            /**
            @param {Function} callback
            */
            put(path: string, action: Function | [Function, string]): any;
            name(name: string): any; /**
            @param {Function} callback
            */
            middleware(name: string | string[]): any;
            group(options: Object, callable: Function): void;
            all(): any[];
        };
    };
    /**
    @param {Function} callback
    */
    static onReset(callback: Function): {
        new (): import("./AuthService");
        /**
        @param {Function} callback
        */
        beforeLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeLogout(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeVerify(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeResend(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        onForgot(callback: Function): any;
        onReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onAuthenticated(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegistered(callback: Function): any;
        /**
        @param {Function} callback
        */
        onVerification(callback: Function): any;
        /**
        @param {Function} callback
        */
        onEmailResend(callback: Function): any;
        /**
        @param {Mailable} mailer
        */
        verificationMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Mailable} mailer
        */
        resetPasswordMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Object} config
        */
        routes(config?: any): {
            new (): Route;
            addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
            delete(path: string, action: Function | [Function, string]): any;
            get(path: string, action: Function | [Function, string]): any;
            options(path: string, action: Function | [Function, string]): any;
            patch(path: string, action: Function | [Function, string]): any;
            post(path: string, action: Function | [Function, string]): any;
            /**
            @param {Function} callback
            */
            put(path: string, action: Function | [Function, string]): any;
            name(name: string): any; /**
            @param {Function} callback
            */
            middleware(name: string | string[]): any;
            group(options: Object, callable: Function): void;
            all(): any[];
        };
    };
    /**
    @param {Function} callback
    */
    static onAuthenticated(callback: Function): {
        new (): import("./AuthService");
        /**
        @param {Function} callback
        */
        beforeLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeLogout(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeVerify(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeResend(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        onForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        onReset(callback: Function): any;
        onAuthenticated(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegistered(callback: Function): any;
        /**
        @param {Function} callback
        */
        onVerification(callback: Function): any;
        /**
        @param {Function} callback
        */
        onEmailResend(callback: Function): any;
        /**
        @param {Mailable} mailer
        */
        verificationMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Mailable} mailer
        */
        resetPasswordMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Object} config
        */
        routes(config?: any): {
            new (): Route;
            addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
            delete(path: string, action: Function | [Function, string]): any;
            get(path: string, action: Function | [Function, string]): any;
            options(path: string, action: Function | [Function, string]): any;
            patch(path: string, action: Function | [Function, string]): any;
            post(path: string, action: Function | [Function, string]): any;
            /**
            @param {Function} callback
            */
            put(path: string, action: Function | [Function, string]): any;
            name(name: string): any; /**
            @param {Function} callback
            */
            middleware(name: string | string[]): any;
            group(options: Object, callable: Function): void;
            all(): any[];
        };
    };
    /**
    @param {Function} callback
    */
    static onRegistered(callback: Function): {
        new (): import("./AuthService");
        /**
        @param {Function} callback
        */
        beforeLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeLogout(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeVerify(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeResend(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        onForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        onReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onAuthenticated(callback: Function): any;
        onRegistered(callback: Function): any;
        /**
        @param {Function} callback
        */
        onVerification(callback: Function): any;
        /**
        @param {Function} callback
        */
        onEmailResend(callback: Function): any;
        /**
        @param {Mailable} mailer
        */
        verificationMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Mailable} mailer
        */
        resetPasswordMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Object} config
        */
        routes(config?: any): {
            new (): Route;
            addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
            delete(path: string, action: Function | [Function, string]): any;
            get(path: string, action: Function | [Function, string]): any;
            options(path: string, action: Function | [Function, string]): any;
            patch(path: string, action: Function | [Function, string]): any;
            post(path: string, action: Function | [Function, string]): any;
            /**
            @param {Function} callback
            */
            put(path: string, action: Function | [Function, string]): any;
            name(name: string): any; /**
            @param {Function} callback
            */
            middleware(name: string | string[]): any;
            group(options: Object, callable: Function): void;
            all(): any[];
        };
    };
    /**
    @param {Function} callback
    */
    static onVerification(callback: Function): {
        new (): import("./AuthService");
        /**
        @param {Function} callback
        */
        beforeLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeLogout(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeVerify(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeResend(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        onForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        onReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onAuthenticated(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegistered(callback: Function): any;
        onVerification(callback: Function): any;
        /**
        @param {Function} callback
        */
        onEmailResend(callback: Function): any;
        /**
        @param {Mailable} mailer
        */
        verificationMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Mailable} mailer
        */
        resetPasswordMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Object} config
        */
        routes(config?: any): {
            new (): Route;
            addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
            delete(path: string, action: Function | [Function, string]): any;
            get(path: string, action: Function | [Function, string]): any;
            options(path: string, action: Function | [Function, string]): any;
            patch(path: string, action: Function | [Function, string]): any;
            post(path: string, action: Function | [Function, string]): any;
            /**
            @param {Function} callback
            */
            put(path: string, action: Function | [Function, string]): any;
            name(name: string): any; /**
            @param {Function} callback
            */
            middleware(name: string | string[]): any;
            group(options: Object, callable: Function): void;
            all(): any[];
        };
    };
    /**
    @param {Function} callback
    */
    static onEmailResend(callback: Function): {
        new (): import("./AuthService");
        /**
        @param {Function} callback
        */
        beforeLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeLogout(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeVerify(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeResend(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        onForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        onReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onAuthenticated(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegistered(callback: Function): any;
        /**
        @param {Function} callback
        */
        onVerification(callback: Function): any;
        onEmailResend(callback: Function): any;
        /**
        @param {Mailable} mailer
        */
        verificationMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Mailable} mailer
        */
        resetPasswordMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Object} config
        */
        routes(config?: any): {
            new (): Route;
            addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
            delete(path: string, action: Function | [Function, string]): any;
            get(path: string, action: Function | [Function, string]): any;
            options(path: string, action: Function | [Function, string]): any;
            patch(path: string, action: Function | [Function, string]): any;
            post(path: string, action: Function | [Function, string]): any;
            /**
            @param {Function} callback
            */
            put(path: string, action: Function | [Function, string]): any;
            name(name: string): any; /**
            @param {Function} callback
            */
            middleware(name: string | string[]): any;
            group(options: Object, callable: Function): void;
            all(): any[];
        };
    };
    /**
    @param {Mailable} mailer
    */
    static verificationMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): {
        new (): import("./AuthService");
        /**
        @param {Function} callback
        */
        beforeLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeLogout(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeVerify(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeResend(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        onForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        onReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onAuthenticated(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegistered(callback: Function): any;
        /**
        @param {Function} callback
        */
        onVerification(callback: Function): any;
        /**
        @param {Function} callback
        */
        onEmailResend(callback: Function): any;
        verificationMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Mailable} mailer
        */
        resetPasswordMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Object} config
        */
        routes(config?: any): {
            new (): Route;
            addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
            delete(path: string, action: Function | [Function, string]): any;
            get(path: string, action: Function | [Function, string]): any;
            options(path: string, action: Function | [Function, string]): any;
            patch(path: string, action: Function | [Function, string]): any;
            post(path: string, action: Function | [Function, string]): any;
            /**
            @param {Function} callback
            */
            put(path: string, action: Function | [Function, string]): any;
            name(name: string): any; /**
            @param {Function} callback
            */
            middleware(name: string | string[]): any;
            group(options: Object, callable: Function): void;
            all(): any[];
        };
    };
    /**
    @param {Mailable} mailer
    */
    static resetPasswordMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): {
        new (): import("./AuthService");
        /**
        @param {Function} callback
        */
        beforeLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeLogout(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeVerify(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeResend(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        beforeReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onLogin(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegister(callback: Function): any;
        /**
        @param {Function} callback
        */
        onForgot(callback: Function): any;
        /**
        @param {Function} callback
        */
        onReset(callback: Function): any;
        /**
        @param {Function} callback
        */
        onAuthenticated(callback: Function): any;
        /**
        @param {Function} callback
        */
        onRegistered(callback: Function): any;
        /**
        @param {Function} callback
        */
        onVerification(callback: Function): any;
        /**
        @param {Function} callback
        */
        onEmailResend(callback: Function): any;
        /**
        @param {Mailable} mailer
        */
        verificationMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        resetPasswordMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
        /**
        @param {Object} config
        */
        routes(config?: any): {
            new (): Route;
            addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
            delete(path: string, action: Function | [Function, string]): any;
            get(path: string, action: Function | [Function, string]): any;
            options(path: string, action: Function | [Function, string]): any;
            patch(path: string, action: Function | [Function, string]): any;
            post(path: string, action: Function | [Function, string]): any;
            /**
            @param {Function} callback
            */
            put(path: string, action: Function | [Function, string]): any;
            name(name: string): any; /**
            @param {Function} callback
            */
            middleware(name: string | string[]): any;
            group(options: Object, callable: Function): void;
            all(): any[];
        };
    };
    /**
    @param {Object} config
    */
    static routes(config?: any): {
        new (): Route;
        addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
        delete(path: string, action: Function | [Function, string]): any;
        get(path: string, action: Function | [Function, string]): any;
        options(path: string, action: Function | [Function, string]): any;
        patch(path: string, action: Function | [Function, string]): any;
        post(path: string, action: Function | [Function, string]): any;
        /**
        @param {Function} callback
        */
        put(path: string, action: Function | [Function, string]): any;
        name(name: string): any; /**
        @param {Function} callback
        */
        middleware(name: string | string[]): any;
        group(options: Object, callable: Function): void;
        all(): any[];
    };
}
import Route = require("../Http/Router/Manager");
