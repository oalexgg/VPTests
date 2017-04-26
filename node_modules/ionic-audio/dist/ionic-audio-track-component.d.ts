import { ITrackConstraint } from './ionic-audio-interfaces';
import { AudioProvider } from './ionic-audio-providers';
import { DoCheck, EventEmitter } from '@angular/core';
/**
 * # ```<audio-track>```
 *
 * Creates a top level audio-track component
 *
 * ## Usage
 *
 * ````
 *   <audio-track #audio [track]="myTrack" (onFinish)="onTrackFinished($event)">
 *   ...
 *   </audio-track>
 * ````
 * @element audio-track
 * @export
 * @class AudioTrackComponent
 */
export declare class AudioTrackComponent implements DoCheck {
    private _audioProvider;
    /**
     * Input property containing a JSON object with at least a src property
     * ````
     *   this.myTrack = {
     *     src: 'https://www,mysite.com/myTrack.mp3',
     *     artist: 'Artist name',
     *     title: '...',
     *     art: 'img/artist.jpg',
     *     preload: 'metadata' // tell the plugin to preload metadata such as duration for this track
     *   };
     * ````
     * @property track
     * @type {ITrackConstraint}
     */
    track: ITrackConstraint;
    /**
     * Output property expects an event handler to be notified whenever playback finishes
     *
     * @property onFinish
     * @type {EventEmitter}
     */
    onFinish: EventEmitter<ITrackConstraint>;
    private _isFinished;
    private _audioTrack;
    constructor(_audioProvider: AudioProvider);
    ngOnInit(): void;
    play(): void;
    pause(): void;
    toggle(): void;
    seekTo(time: number): void;
    readonly id: number;
    readonly art: string;
    readonly artist: string;
    readonly title: string;
    readonly progress: number;
    readonly isPlaying: boolean;
    readonly duration: number;
    readonly completed: number;
    readonly canPlay: boolean;
    readonly error: MediaError;
    readonly isLoading: boolean;
    readonly hasLoaded: boolean;
    ngDoCheck(): void;
}
