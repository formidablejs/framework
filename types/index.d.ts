import { Command } from "./Foundation/Console/Command";
import { Context } from "./Foundation/Context";
import { FastifyInstance } from "fastify/types/instance";
import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify/types/request";
import { handleException } from "./Foundation/Exceptions/Handler/handleException";
import { handleMaintenanceMode } from "./Foundation/Exceptions/Handler/handleException";
import { ICommand } from "./Foundation/Application";
import { IContextual } from './Database/IContextual'
import { IMiddleware } from './Http/Middleware/IMiddleware'
import { Mail } from "@formidablejs/mailer";
import { Mailable } from "@formidablejs/mailer";
import { MailServiceResolver } from "@formidablejs/mailer";
import { MiddlewareAliases } from './Http/Middleware/MiddlewareAliases'
import { MiddlewareGroups } from './Http/Middleware/MiddlewareGroups'
import { Prop } from "@formidablejs/console";
import { PropList } from '@formidablejs/console';
import { RequestGenericInterface } from "fastify";
import { TokenPayload } from "./Http/Csrf/TokenPayload";
import { use } from "./Support/Decorators/tsUse";
import { ValidationRules } from "./Http/Request/ValidationRules";
import * as helpers from "./Support/Helpers/index";
import AcceptLanguage from "./Support/Language/Middleware/AcceptLanguage";
import Application from "./Foundation/Application";
import ApplicationException from "./Foundation/Exceptions/ApplicationException";
import Auth from "./Auth/Auth";
import Authenticate from "./Auth/Http/Middleware/Authenticate";
import AuthenticationServiceResolver from "./Auth/AuthenticationServiceResolver";
import AuthService from "./Auth/AuthService";
import config from "./Support/Helpers/config";
import ConfigRepository from "./Config/Repository";
import Console from "./Foundation/Console";
import ConsoleKernel from "./Foundation/ConsoleKernel";
import Controller from "./Http/Controller";
import ConvertEmptyStringsToNull from "./Http/Middleware/ConvertEmptyStringsToNull";
import CookieServiceResolver from "./Http/Cookie/CookieServiceResolver";
import CorsServiceResolver from "./Http/Cors/CorsServiceResolver";
import CsrfServiceResolver from "./Http/Csrf/CsrfServiceResolver";
import Database from "./Database/Database";
import DB from "./Database/Database";
import decrypt from "./Support/Helpers/decrypt";
import EmailNotVerifiedException from './Auth/Exceptions/EmailNotVerifiedException';
import encrypt from "./Support/Helpers/encrypt";
import Encrypter from "./Foundation/Encrypter";
import EnsureEmailIsVerified from './Http/Middleware/EnsureEmailIsVerified';
import EnsureStateless from "./Http/Middleware/EnsureStateless";
import env from "./Support/Helpers/env";
import ErrorIfAuthenticated from "./Auth/Http/Middleware/ErrorIfAuthenticated";
import ExceptionHandler from "./Foundation/Exceptions/Handler";
import expiresIn from "./Support/Helpers/expiresIn";
import ForbiddenException from "./Http/Exceptions/ForbiddenException";
import FormRequest from "./Http/Request/FormRequest";
import HasCsrfToken from "./Http/Middleware/HasCsrfToken";
import HasEncryptionKey from "./Support/Encryption/HasEncryptionKey";
import Hash from "./Hashing/Hash";
import HashServiceResolver from "./Hashing/HashServiceResolver";
import HttpException from "./Http/Exceptions/HttpException";
import Kernel from "./Http/Kernel";
import Language from "./Support/Language/Language";
import LanguageServiceResolver from "./Support/Language/LanguageServiceResolver";
import MaintenanceModeException from "./Foundation/Exceptions/MaintenanceModeException";
import MaintenanceServiceResolver from "./Foundation/MaintenanceServiceResolver";
import Middleware from "./Http/Middleware";
import MultipartServiceResolver from "./Http/Request/MultipartServiceResolver";
import NotFoundException from "./Http/Exceptions/NotFoundException";
import PersonalAccessToken from "./Auth/Tokens/PersonalAccessToken";
import PersonalAccessTokenServiceResolver from "./Auth/Tokens/PersonalAccessTokenServiceResolver";
import Redirect from "./Http/Redirect/Redirect";
import Redis from "./Redis/Redis";
import RedisServiceResolver from "./Redis/RedisServiceResolver";
import Repository from "./Database/Repository";
import Request from "./Http/Request/Request";
import ResetPassword from './Auth/Mail/ResetPassword'
import Response from "./Http/Response/Response";
import response from "./Support/Helpers/response";
import Route from "./Http/Router/Route";
import route from "./Support/Helpers/route";
import Server from './Foundation/Server'
import ServiceResolver from "./Support/ServiceResolver";
import SessionDriverManager from "./Http/Session/DriverManager";
import SessionFileStoreServiceResolver from "./Http/Session/SessionFileStoreServiceResolver";
import SessionMemoryStoreServiceResolver from "./Http/Session/SessionMemoryStoreServiceResolver";
import SessionServiceResolver from "./Http/Session/SessionServiceResolver";
import signedRoute from "./Support/Helpers/signedRoute";
import slug from "./Support/Helpers/slug";
import StaticContentServiceResolver from "./Http/Static/StaticContentServiceResolver";
import strRandom from "./Support/Helpers/strRandom";
import temporarySignedRoute from "./Support/Helpers/temporarySignedRoute";
import TransformsRequest from "./Http/Middleware/TransformsRequest";
import TrimStrings from "./Http/Middleware/TrimStrings";
import URL from "./Http/URL/URL";
import ValidateSignature from "./Http/Middleware/ValidateSignature";
import ValidationException from "./Validator/Exceptions/ValidationException";
import ValidationServiceResolver from "./Validator/ValidationServiceResolver";
import Validator from "./Validator/Validator";
import VerifyCsrfToken from "./Http/Middleware/VerifyCsrfToken";
import VerifyEmail from './Auth/Mail/VerifyEmail'
import View from "./Http/View/View";
import view from "./Support/Helpers/view";
import ViewResponse from "./Http/Response/ViewResponse";

declare global {
    interface Window {
        imba_devtools?: {
            debug?: boolean
            manifest?: object
            socket?: EventSource
        }
    }
}

export {
    αcontext,
    αuse,
    AcceptLanguage,
    Application,
    ApplicationException,
    Auth,
    Authenticate,
    AuthenticationServiceResolver,
    AuthService,
    Command,
    config,
    ConfigRepository,
    Console,
    ConsoleKernel,
    Context,
    Controller,
    ConvertEmptyStringsToNull,
    CookieServiceResolver,
    CorsServiceResolver,
    CsrfServiceResolver,
    Database,
    DB,
    decrypt,
    EmailNotVerifiedException,
    encrypt,
    Encrypter,
    EnsureEmailIsVerified,
    EnsureStateless,
    env,
    ErrorIfAuthenticated,
    ExceptionHandler,
    expiresIn,
    FastifyInstance,
    FastifyReply,
    FastifyRequest,
    ForbiddenException,
    FormRequest,
    handleException,
    handleMaintenanceMode,
    HasCsrfToken,
    HasEncryptionKey,
    Hash,
    HashServiceResolver,
    helpers,
    HttpException,
    ICommand,
    IContextual,
    IMiddleware,
    Kernel,
    Language,
    LanguageServiceResolver,
    Mail,
    Mailable,
    MailServiceResolver,
    MaintenanceModeException,
    MaintenanceServiceResolver,
    Middleware,
    MiddlewareAliases,
    MiddlewareGroups,
    MultipartServiceResolver,
    NotFoundException,
    PersonalAccessToken,
    PersonalAccessTokenServiceResolver,
    Prop,
    PropList,
    Redirect,
    Redis,
    RedisServiceResolver,
    Repository,
    Request,
    ResetPassword,
    RequestGenericInterface,
    response,
    Response,
    Route,
    route,
    Server,
    ServiceResolver,
    SessionDriverManager,
    SessionFileStoreServiceResolver,
    SessionMemoryStoreServiceResolver,
    SessionServiceResolver,
    signedRoute,
    slug,
    StaticContentServiceResolver,
    strRandom,
    temporarySignedRoute,
    TokenPayload,
    TransformsRequest,
    TrimStrings,
    URL,
    use,
    ValidateSignature,
    ValidationException,
    ValidationRules,
    ValidationServiceResolver,
    Validator,
    VerifyCsrfToken,
    VerifyEmail,
    view,
    View,
    ViewResponse
};
