import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
import { ISource } from '@/services/interface';
type SourceState ={
    mySource : ISource[];
    clonedSource : ISource[];
    workBench : ISource[];
    subWorkBench : ISource[];
    addSource: (type: string, source: ISource) => void;
    removeSource: (type: string, source: ISource) => void;
    moveSource: (from: string, to: string, source: ISource) => void;
}


export const SourceStore = create<SourceState>((set)=>({
    mySource :[],
    clonedSource : [],
    workBench:[],
    subWorkBench:[],
    addSource: (type, source) => set((state) => ({ ...state, [type]: [...state[type], source] })),
    removeSource: (type, source) => set((state) => ({ ...state, [type]: state[type].filter((item) => item !== source) })),
    moveSource: (from, to, source) => set((state) => ({
        ...state,
        [from]: state[from].filter((item) => item !== source),
        [to]: [...state[to], source]
    })),
}))
// 1. Source 정의
// 2. My sousrce<source>
// 3. Cloned source<source>
// 4. source in workbench<source>