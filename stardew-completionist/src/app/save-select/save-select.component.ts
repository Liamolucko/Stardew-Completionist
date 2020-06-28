import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SaveInfoService } from '../data/save-info.service';
import { deepEquals } from '../util';

@Component({
  templateUrl: './save-select.component.html',
  styleUrls: ['./save-select.component.scss']
})
export class SaveSelectComponent implements AfterViewInit {
  @ViewChild('fileInput') set input(ref: ElementRef<HTMLInputElement>) {
    const el = ref.nativeElement;
    el.onchange = async () => {
      try {
        this.saveService.getSaveFileInfo(await el.files[0].text());
        el.value = null;
        this.dialog.close();
      } catch (e) {
        this.snackBar.open((e as Error).message, 'Dismiss', {
          duration: 2000,
        });
        el.value = null;
      }
    };
  }

  @ViewChild(MatSelectionList) saveList: MatSelectionList;

  get platform(): string { return navigator.platform; }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get deepEquals() { return deepEquals; }

  windows = navigator.platform.toLowerCase().includes('win');
  platformName = this.windows ? 'Windows' : 'macOS/Linux';
  basePath = this.windows ? '%APPDATA%\\StardewValley\\Saves' : '~/.config/StardewValley/Saves';
  path = this.basePath + (this.windows ? '\\<save>\\SaveGameInfo' : '/<save>/SaveGameInfo');

  saves = this.saveService.getSaveFiles().then(saves => saves?.sort((a, b) => b.lastSaved - a.lastSaved));

  constructor(private snackBar: MatSnackBar, public saveService: SaveInfoService, private dialog: MatDialogRef<SaveSelectComponent>) { }

  ngAfterViewInit(): void {
    if (this.saveService.isElectron) {
      this.saveList.selectionChange.subscribe((change: MatSelectionListChange) => {
        if (change.option && change.option.selected) {
          this.saveService.setSaveFile(change.option.value);
          this.dialog.close();
        }
      });
    }
  }

  /** Copies the path for Stardew Valley save files to the users' clipboard */
  async copyPath(): Promise<void> {
    await navigator.clipboard.writeText(this.basePath);
    this.snackBar.open(`${this.basePath} copied to clipboard`, 'Dismiss', {
      duration: 2000
    });
  }
}
