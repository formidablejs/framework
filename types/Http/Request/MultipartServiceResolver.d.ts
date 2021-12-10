export default class MultipartServiceResolver extends ServiceResolver {
    saveTempFiles(): import("../..").Application;
    unlinkTempFiles(): import("../..").Application;
    /**
    @param {File} value
    */
    handleFile(value: File): boolean;
    /**
    @param {File} value
    @param {String} mimes
    */
    handleMimes(value: File, mimes: string): boolean;
    /**
    @param {File} value
    @param {String} mimes
    */
    handleMimetypes(value: File, mimes: string): boolean;
    /**
    @param {File} value
    @param {String|null} mimes
    */
    handleImages(value: File, mimes: string | null): boolean;
    /**
    @param {File} value
    */
    handleVideos(value: File): boolean;
    /**
    @param {File} value
    @param {Number} size
    */
    handleSize(value: File, size: number): boolean;
}
import ServiceResolver from "../../Support/ServiceResolver";
import File from "./File";
