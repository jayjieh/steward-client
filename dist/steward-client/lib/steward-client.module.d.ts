import { StewardConfig } from './steward-client.service';
export declare class StewardClientModule {
    static forRoot(config: StewardConfig): {
        ngModule: typeof StewardClientModule;
        providers: {
            provide: typeof StewardConfig;
            useValue: StewardConfig;
        }[];
    };
}
