import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
HttpClient;
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getLeadsList() {
    return this.http.get(`http://localhost:3000/api/leads`);
  }
  getleadPotentialDuplicate(leadID: any) {
    return this.http.get(
      `http://localhost:3000/api/leads/${leadID}/potential-duplicates`
    );
  }
  putleadActualDuplicate(currentLeadId: any, actualDuplicateId: any) {
    const url = 'http://localhost:3000/api/leads/' + currentLeadId;

    const data = {
      duplicate_of: actualDuplicateId,
    };

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('error');
        }

        console.log('done');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
