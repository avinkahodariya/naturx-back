import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type EventDocument = HydratedDocument<Event>;

class Logistics {
  @ApiProperty({ description: 'Suppliers or partners for the event' })
  @Prop()
  suppliersPartners: string;

  @ApiProperty({ description: 'Assigned personnel' })
  @Prop()
  assignedTo: string;

  @ApiProperty({ description: 'Due dates for tasks or milestones' })
  @Prop()
  dueDates: Date;

  @ApiProperty({ description: 'Task list or checklist' })
  @Prop()
  taskList: string;

  @ApiProperty({ description: 'Additional services' })
  @Prop()
  additionalServices: string;
}

@Schema({
  timestamps: true,
})
export class Event {
  @ApiProperty({ description: 'Event name' })
  @Prop({ required: true })
  eventName: string;

  @ApiProperty({ description: 'Event date and time' })
  @Prop({ required: true })
  eventDateTime: Date;

  @ApiProperty({ description: 'Venue or location for the event' })
  @Prop({ type: String, required: true })
  venueLocation: string;

  @ApiProperty({ description: 'Objective or purpose of the event' })
  @Prop()
  objectivePurpose: string;

  @ApiProperty({ description: 'Agenda items for the event' })
  @Prop()
  agendaItems: string[];

  @ApiProperty({ description: 'Breaks and intervals schedule' })
  @Prop()
  breaksIntervals: string[];

  @ApiProperty({ description: 'Timings' })
  @Prop()
  timings: string[];

  @ApiProperty({ description: 'Registration or RSVP link' })
  @Prop()
  registrationRSVPLink: string;

  @ApiProperty({ description: 'Expected headcount' })
  @Prop({ type: Number })
  expectedHeadcount: number;

  @ApiProperty({ description: 'VIP or keynote speakers' })
  @Prop()
  vipKeynoteSpeakers: string;

  @ApiProperty({ description: 'Total budget for the event' })
  @Prop()
  totalBudget: string;

  @ApiProperty({ description: 'Income or funds raised during the event' })
  @Prop()
  incomeFundsRaised: string;

  @ApiProperty({ description: 'Profit or loss calculation' })
  @Prop()
  profitLoss: string;

  @ApiProperty({ description: 'Expense breakdown details' })
  @Prop()
  expenseBreakdown: string;

  @ApiProperty({ description: 'Attendee list' })
  @Prop()
  attendeeList: string[];

  @ApiProperty({ description: 'Logistics and resource management' })
  @Prop({ type: [Logistics] })
  logistics: Logistics[];

  @ApiProperty({ description: 'Notes or comments' })
  @Prop()
  notes: string;

  @ApiProperty({ description: 'Uploaded images for the event' })
  @Prop({ type: [String] })
  uploadedImages: string[];

  @ApiProperty({ description: 'Uploaded documents for the event' })
  @Prop({ type: [String] })
  uploadedDocuments: string[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
