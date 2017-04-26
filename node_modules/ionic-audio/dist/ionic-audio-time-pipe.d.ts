import { PipeTransform } from '@angular/core';
/**
 * A pipe to convert milliseconds to a string representation
 *
 * @export
 * @class AudioTimePipe
 * @implements {PipeTransform}
 */
export declare class AudioTimePipe implements PipeTransform {
    /**
     * Transforms milliseconds to hh:mm:ss
     *
     * @method transform
     * @param {number} [value] The milliseconds
     * @return {string} hh:mm:ss
     */
    transform(value?: number): string;
}
