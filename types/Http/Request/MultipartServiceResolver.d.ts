export default class MultipartServiceResolver extends ServiceResolver {
    saveTempFiles(): import("../..").Application;
    unlinkTempFiles(): import("../..").Application;
    /**
    @param {File} value
    */
    handleFile(value: File): boolean;
    /**
    @param {File} value
    @param {string} mimes
    */
    handleMimes(value: File, mimes: string): boolean;
    /**
    @param {File} value
    @param {string} mimes
    */
    handleMimetypes(value: File, mimes: string): boolean;
    /**
    @param {File} value
    @param {string|null} mimes
    */
    handleImages(value: File, mimes: string | null): boolean;
    /**
    @param {File} value
    */
    handleVideos(value: File): boolean;
    /**
    @param {File} value
    @param {number} size
    */
    handleSize(value: File, size: number): boolean;
}
import ServiceResolver from "../../Support/ServiceResolver";
import File from "./File";
