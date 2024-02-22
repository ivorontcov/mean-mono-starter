import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoInnerComponent } from './demo-inner.component';

describe('DemoInnerComponent', () => {
    let component: DemoInnerComponent;
    let fixture: ComponentFixture<DemoInnerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DemoInnerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DemoInnerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
