import { IAudioTrack } from './ionic-audio-interfaces';
/**
 * Creates an HTML5 audio track
 *
 * @export
 * @class WebAudioTrack
 * @constructor
 * @implements {IAudioTrack}
 */
export declare class WebAudioTrack implements IAudioTrack {
    src: string;
    preload: string;
    private audio;
    isPlaying: boolean;
    isFinished: boolean;
    private _progress;
    private _completed;
    private _duration;
    private _id;
    private _isLoading;
    private _hasLoaded;
    constructor(src: string, preload?: string);
    private createAudio();
    private onTimeUpdate(e);
    static formatTime(value: number): string;
    /**
     * Gets the track id
     *
     * @property id
     * @type {number}
     */
    /**
     * Sets the track id
     *
     * @property id
     */
    id: number;
    /**
     * Gets the track duration, or -1 if it cannot be determined
     *
     * @property duration
     * @readonly
     * @type {number}
     */
    readonly duration: number;
    /**
     * Gets current track time (progress)
     *
     * @property progress
     * @readonly
     * @type {number}
     */
    readonly progress: number;
    /**
     * Gets current track progress as a percentage
     *
     * @property completed
     * @readonly
     * @type {number}
     */
    readonly completed: number;
    /**
     * Gets any errors logged by HTML5 audio
     *
     * @property error
     * @readonly
     * @type {MediaError}
     */
    readonly error: MediaError;
    /**
     * Gets a boolean value indicating whether the current source can be played
     *
     * @property canPlay
     * @readonly
     * @type {boolean}
     */
    readonly canPlay: boolean;
    /**
     * Gets a boolean value indicating whether the track is in loading state
     *
     * @property isLoading
     * @readonly
     * @type {boolean}
     */
    readonly isLoading: boolean;
    /**
     * Gets a boolean value indicating whether the track has finished loading
     *
     * @property hadLoaded
     * @readonly
     * @type {boolean}
     */
    readonly hasLoaded: boolean;
    /**
     * Plays current track
     *
     * @method play
     */
    play(): void;
    /**
     * Pauses current track
     *
     * @method pause
     */
    pause(): void;
    /**
     * Stops current track and releases audio
     *
     * @method stop
     */
    stop(): void;
    /**
     * Seeks to a new position within the track
     *
     * @method seekTo
     * @param {number} time the new position to seek to
     */
    seekTo(time: number): void;
    /**
     * Releases audio resources
     *
     * @method destroy
     */
    destroy(): void;
}
