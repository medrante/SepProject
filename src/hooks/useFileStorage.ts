import { useState, useEffect } from 'react';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';

import {
  Plugins,
  FilesystemDirectory,
  Capacitor,
  FilesystemEncoding
} from '@capacitor/core';

export interface Recording {}
export function useFileStorage() {
  const { Filesystem } = Plugins;

  const { deleteFile, getUri, readFile, writeFile } = useFilesystem();

  const makeNewDir = async () => {
    const dir = await Filesystem.mkdir({
      path: 'data',
      directory: FilesystemDirectory.Documents,
      recursive: false
    });
    console.log(dir);
  };

  const saveToFile = async (inputData: string) => {
    await writeFile({
      path: 'data/data.json',
      data: inputData,
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    });
  };

  const createFile = async () => {
    makeNewDir();

    await writeFile({
      path: 'data/data.json',
      data: '[]',
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    });
  };

  const getContents = async () => {
    let contents = await Filesystem.readFile({
      path: 'data/data.json',
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    });
    console.log(contents);
  };

  return {
    saveToFile,
    getContents
  };
}
