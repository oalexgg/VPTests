/**
 * Defines the audio provider contract
 *
 * @export
 * @interface IAudioProvider
 */
export interface IAudioProvider {
    current: number;
    tracks: IAudioTrack[];
    create(track: ITrackConstraint): IAudioTrack;
    add(track: IAudioTrack): any;
    play(index: number): any;
    pause(index?: number): any;
    stop(index?: number): any;
}
/**
 * Defines the properties for JSON objects representing tracks to be played
 *
 * @export
 * @interface ITrackConstraint
 */
export interface ITrackConstraint {
    id?: number;
    src: string;
    title?: string;
    artist?: string;
    art?: string;
    preload?: string;
}
/**
 * Defines the audio track contract
 *
 * @export
 * @interface IAudioTrack
 * @extends {ITrackConstraint}
 */
export interface IAudioTrack extends ITrackConstraint {
    src: string;
    id: number;
    isPlaying: boolean;
    isLoading: boolean;
    isFinished: boolean;
    duration: number;
    progress: number;
    completed: number;
    canPlay: boolean;
    error: MediaError;
    play(): any;
    pause(): any;
    stop(): any;
    seekTo(time: number): any;
    destroy(): any;
}
