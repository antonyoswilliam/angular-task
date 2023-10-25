import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { __await } from 'tslib';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css'],
})
export class LeadsComponent implements OnInit {
  leadsList: any[] = [];
  leadPotentialDuplicateIDs: any[] = [];
  leadPotentialDuplicateInfo: any[] = [];
  currentSelectedLead: any;
  showLeadDuplicates: boolean = false;
  constructor(private service: HttpService) {}
  ngOnInit(): void {
    this.getLeads();
  }

  getLeads() {
    this.service.getLeadsList().subscribe(
      (res: any) => {
        this.leadsList = res;
      },
      (error) => alert('error')
    );
  }

  getLeadPotentialDuplicate(leadID: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.getleadPotentialDuplicate(leadID).subscribe(
        (res: any) => {
          this.leadPotentialDuplicateIDs = res;
          console.log(this.leadPotentialDuplicateIDs);
          resolve(''); // Resolve the promise when the subscription completes
        },
        (error) => {
          console.error(error);
          reject(error); // Reject the promise if an error occurs
        }
      );
    });
  }

  async openLeadDuplicate(lead: any) {
    try {
      await this.getLeadPotentialDuplicate(lead.lead_id);
      this.leadPotentialDuplicateInfo = this.leadsList.filter((a) =>
        this.leadPotentialDuplicateIDs.includes(a.lead_id)
      );
      this.currentSelectedLead = lead;
      this.showLeadDuplicates = true;
      console.log(this.leadPotentialDuplicateInfo);
    } catch (error) {
      console.error(error);
      alert('An error occurred'); // Handle the error appropriately
    }
  }

  setAsActualDuplicates(currentLeadId: any, actualDuplicate: any) {
    this.service.putleadActualDuplicate(currentLeadId, actualDuplicate);
  }
  closeleadDuplicate() {
    this.showLeadDuplicates = false;
  }
}
